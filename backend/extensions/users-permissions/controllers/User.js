'use strict';

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const _ = require('lodash');
const adminUserController = require('./user/admin');
const apiUserController = require('./user/api');
const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

const resolveController = ctx => {
  const {
    state: { isAuthenticatedAdmin },
  } = ctx;

  return isAuthenticatedAdmin ? adminUserController : apiUserController;
};

const resolveControllerMethod = method => ctx => {
  const controller = resolveController(ctx);
  const callbackFn = controller[method];

  if (!_.isFunction(callbackFn)) {
    return ctx.notFound();
  }

  return callbackFn(ctx);
};

module.exports = {
  create: resolveControllerMethod('create'),
  update: resolveControllerMethod('update'),

  /**
   * Retrieve user records.
   * @return {Object|Array}
   */
  async find(ctx, next, { populate } = {}) {
    let users;

    if (_.has(ctx.query, '_q')) {
      // use core strapi query to search for users
      users = await strapi.query('user', 'users-permissions').search(ctx.query, populate);
    } else {
      users = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query, populate);
    }

    ctx.body = users.map(sanitizeUser);
  },

  /**
   * Retrieve a user record.
   * @return {Object}
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    let data = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
  },

  /**
   * Retrieve user count.
   * @return {Number}
   */
  async count(ctx) {
    if (_.has(ctx.query, '_q')) {
      return await strapi.plugins['users-permissions'].services.user.countSearch(ctx.query);
    }
    ctx.body = await strapi.plugins['users-permissions'].services.user.count(ctx.query);
  },

  /**
   * Destroy a/an user record.
   * @return {Object}
   */
  async destroy(ctx) {
    const { id } = ctx.params;
    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });
    const data = await strapi.plugins['users-permissions'].services.user.remove({ id });

    /*
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        subject: 'We are sorry to see you go!',
        text: '<p>You have successfully deleted your account.</p><p>Your data is deleted according to the GDPR guidelines.</p>',
        html: '<p>You have successfully deleted your account.</p><p>Your data is deleted according to the GDPR guidelines.</p>',
      });
    } catch (err) {
      return ctx.badRequest(null, err);
    }
    */

    ctx.cookies.set("token", null);
    ctx.send(sanitizeUser(data));
  },

  async destroyAll(ctx) {
    const {
      request: { query },
    } = ctx;

    const toRemove = Object.values(_.omit(query, 'source'));
    const { primaryKey } = strapi.query('user', 'users-permissions');
    const finalQuery = { [`${primaryKey}_in`]: toRemove, _limit: 100 };

    const data = await strapi.plugins['users-permissions'].services.user.removeAll(finalQuery);

    ctx.send(data);
  },

  /**
   * Retrieve authenticated user.
   * @return {Object|Array}
   */
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    ctx.body = sanitizeUser(user);
  },

  /**
   * Update the disease, gender and the starting progress of a user
   * @return {Object}
   */
  async updateSensitive(ctx) {
    const { id } = ctx.params;

    let updateData = {
      ...ctx.request.body
    };

    const { gender, diseases } = ctx.request.body;

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (!_.has(ctx.request.body, 'gender') || !gender) {
      return ctx.badRequest(
        null,
        formatError({
          message: 'Please provide your gender',
        })
      );
    }

    if (!_.has(ctx.request.body, 'diseases') || !diseases[0]) {
      return ctx.badRequest(
        null,
        formatError({
          message: 'Please provide your disease',
        })
      );
    }

    let workbook = await strapi.query('workbooks').findOne({disease: diseases[0]});
    let workbooks_progress = {};
    if(workbook) {
      let pages = await strapi.query('pages').find({diseases: diseases[0], genders: gender});
      let total_pages = 0;
      if(pages) {
        pages.forEach(page => {
          const found = workbook.pages.find(wb_page => wb_page.pageId === page.id)
          if(found) {
            total_pages++;
          }
        });
      }

      if(total_pages > 0) {
        workbooks_progress = {
          completed_pages: 0,
          total_pages: total_pages,
          workbook_id: workbook._id
        };
      }
    }

    if(!_.isEmpty(workbooks_progress)) {
      updateData.workbooks_progress = workbooks_progress;
    }
    const data = await strapi.plugins['users-permissions'].services.user.edit({id}, updateData);

    /*
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        subject: 'You have set your disease and gender.',
        text: '<p>You have just set a disease and a gender!</p><p>You will now be allocated a workbook based on your options and you can start whenever you want.</p>',
        html: '<p>You have just set a disease and a gender!</p><p>You will now be allocated a workbook based on your options and you can start whenever you want.</p>',
      });
    } catch (err) {
      return ctx.badRequest(null, err);
    }
    */

    ctx.send(sanitizeUser(data));
  },

  /**
   * Update user's progress
   * @return {Object}
   */
  async updateProgress(ctx) {
    const { id } = ctx.params;

    let updateData = {
      ...ctx.request.body
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit({id}, updateData);

    ctx.send(sanitizeUser(data));
  },

  /**
   * Destroy a user record by anonymizing the data
   * @return {Object}
   */
  async anonymizedDestroy(ctx) {
    const { id } = ctx.params;
    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    let updateData = {
      email: "user" + (Math.floor(Math.random() * 1000000000) + 1000000000).toString() + "@email.com",
      password: Math.random().toString(36).substring(2),
      notifications_frequency: {frequency: "none", time_of_day: "none"},
      blocked: true
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit({id}, updateData);

    /*
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        subject: 'We are sorry to see you go!',
        text: '<p>You have successfully deleted your account by anonymization.</p><p>Your credentials are now random strings and your account has been blocked in order to prevent any security issues.</p>',
        html: '<p>You have successfully deleted your account by anonymization.</p><p>Your credentials are now random strings and your account has been blocked in order to prevent any security issues.</p>',
      });
    } catch (err) {
      return ctx.badRequest(null, err);
    }
    */

    ctx.cookies.set("token", null);
    ctx.send(sanitizeUser(data));
  }
};
