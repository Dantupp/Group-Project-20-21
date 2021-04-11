'use strict';

const _ = require('lodash');
const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

function passwordStrong(password){
  if(password.length<6 || !(password.match(/[a-z]+/)) || !(password.match(/[A-Z]+/)) || !(password.match(/[0-9]+/))){
    return false;
  }else{
    return true;
  }
}

module.exports = {
  /**
   * Create a/an user record.
   * @return {Object}
   */
  async create(ctx) {
    const advanced = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced',
      })
      .get();

    const { email, password, role } = ctx.request.body;

    if (!email) return ctx.badRequest('missing.email');
    if (!password) return ctx.badRequest('missing.password');

    if (advanced.unique_email) {
      const userWithSameEmail = await strapi
        .query('user', 'users-permissions')
        .findOne({ email: email.toLowerCase() });

      if (userWithSameEmail) {
        return ctx.badRequest(
          null,

          formatError({
            id: 'Auth.form.error.email.taken',
            message: 'Email already taken.',
            field: ['email'],
          })
        );
      }
    }

    const user = {
      ...ctx.request.body,
      provider: 'local',
    };

    user.email = user.email.toLowerCase();

    if (!role) {
      const defaultRole = await strapi
        .query('role', 'users-permissions')
        .findOne({ type: advanced.default_role }, []);

      user.role = defaultRole.id;
    }

    try {
      const data = await strapi.plugins['users-permissions'].services.user.add(user);

      ctx.created(sanitizeUser(data));
    } catch (error) {
      ctx.badRequest(null, formatError(error));
    }
  },
  /**
   * Update a/an user record.
   * @return {Object}
   */

  async update(ctx) {
    const advancedConfigs = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced',
      })
      .get();

    const { id } = ctx.params;
    const { email, password, confirmEmail, confirmPassword, currentPassword, notifications_frequency } = ctx.request.body;

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    console.log(ctx.request.body);

    if(_.has(ctx.request.body, 'currentPassword')) {
      if(!currentPassword) {
        return ctx.badRequest(
          null,
          formatError({
            message: 'Please provide your current password.',
          })
        );
      }
      else {
        const validPassword = await strapi.plugins[
          'users-permissions'
        ].services.user.validatePassword(currentPassword, user.password);

        if (!validPassword) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'Auth.form.error.invalid',
              message: 'Current password invalid.',
            })
          );
        }
      }
    }

    if(_.has(ctx.request.body, 'password') && _.has(ctx.request.body, 'confirmPassword')) {
      if(!password && !confirmPassword) {
        return ctx.badRequest(
          null,
          formatError({
            message: 'Please provide a new password.',
          })
        );
      }
      else {
      if (password && !confirmPassword) {
        return ctx.badRequest(
          null,
          formatError({
            message: 'Please confirm your new password.',
          })
        );
      }
      else {
          if (!password && confirmPassword) {
            return ctx.badRequest(
              null,
              formatError({
                message: 'Please provide your new password',
              })
            );
          }
          else {
            if((password && confirmPassword) && (password != confirmPassword)) {
              return ctx.badRequest(
                null,
                formatError({
                  message: 'Passwords don\'t match',
                })
              );
            }
            if(!passwordStrong(password)){
              return ctx.badRequest(
                null,
                formatError({
                  id: 'Auth.form.error.passwordsNotStrong.provide',
                  message: 'Password must contain at least 6 characters, including 1 uppercase, 1 lowercase, and 1 number.',
                })
              );
            }
          }
        }
      }
    }

    if(_.has(ctx.request.body, 'email') && _.has(ctx.request.body, 'confirmEmail')) {
      if(!email && !confirmEmail) {
        return ctx.badRequest(
          null,
          formatError({
            message: 'Please provide your new email.',
          })
        );
      }
      else {
        if (email && !confirmEmail) {
          return ctx.badRequest(
            null,
            formatError({
              message: 'Please confirm your email.',
            })
          );
        }
        else {
          if (!email && confirmEmail) {
            return ctx.badRequest(
              null,
              formatError({
                message: 'Please provide your new email',
              })
            );
          }
          else {
            if((email && confirmEmail) && (email != confirmEmail)) {
              return ctx.badRequest(
                null,
                formatError({
                  message: 'Emails don\'t match',
                })
              );
            }
          }
        }
      }

      // Check if the provided email is valid or not.
      const isEmail = emailRegExp.test(email);

      if (!isEmail) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.email.format',
            message: 'Please provide a valid email address.',
          })
        );
      }
    }

    if (_.has(ctx.request.body, 'notifications_frequency') && (!notifications_frequency.frequency || !notifications_frequency.time_of_day)) {
      return ctx.badRequest(
        null,
        formatError({
          message: 'Please provide a frequency rate and a time of day.',
        })
      );
    }

    if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
      const userWithSameEmail = await strapi
        .query('user', 'users-permissions')
        .findOne({ email: email.toLowerCase() });

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.email.taken',
            message: 'Email already taken',
            field: ['email'],
          })
        );
      }
      ctx.request.body.email = ctx.request.body.email.toLowerCase();
    }

    let updateData = {
      ...ctx.request.body,
    };

    if (_.has(ctx.request.body, 'password') && password === user.password) {
      delete updateData.password;
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit({ id }, updateData);

    let sendToEmail = '';
    if(_.has(ctx.request.body, 'email')) {
      sendToEmail = ctx.request.body.email;
    }
    else {
      sendToEmail = user.email;
    }

    /*
    if(
      _.has(ctx.request.body, "email") ||
      _.has(ctx.request.body, "password") ||
      _.has(ctx.request.body, "confirmEmail") ||
      _.has(ctx.request.body, "confirmPassword") ||
      _.has(ctx.request.body, "currentPassword") ||
      _.has(ctx.request.body, "notifications_frequency")) {
      try {
        await strapi.plugins['email'].services.email.send({
          to: sendToEmail,
          from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
          subject: 'You have made changes to your account details.',
          text: '<p>You have successfully made changes to your account.</p>',
          html: '<p>You have successfully made changes to your account.</p>',
        });
      } catch (err) {
        return ctx.badRequest(null, err);
      }
    }
    */

    ctx.send(sanitizeUser(data));
  },
};
