'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity, parseMultipartData } = require('strapi-utils');
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let gender = ctx.query.gender
    ctx.query.gender = null

    let entities;
    entities = await strapi.services.workbooks.find(ctx.query);
    let tempEntities = [];

    let filter;
    // We need to remove the pages which don't have the gender requested (if in the request).
    if (gender) {
      filter = {genders: gender}
    }
    if (ctx.query.disease) {
      filter = {
        ...filter,
        diseases: ctx.query.disease
      }
    }

    for (const workbook of entities) {
      const fullPages = await strapi.services.pages.find(filter);

      let tempPages = []

      if (workbook.pages) {
        workbook.pages.forEach(page => {
          let foundPage = fullPages.find(p => p.id === page.pageId)
          if (foundPage) {
            tempPages.push(foundPage);
          }
        })

        workbook.pages = tempPages.map(entity => sanitizeEntity(entity, { model: strapi.models.pages }))
      }

      tempEntities.push(workbook)
    }

    entities = tempEntities;

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.workbooks }));
  },

  /**
   * delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    if (checkUserIsAnEditor(ctx)) {
      const entity = await strapi.services.workbooks.delete({ id });
      let users = await strapi.plugins['users-permissions'].services.user.fetchAll({diseases: entity.disease});
      for(let user in users) {
        let user_id = users[user].id;
        let updateData = {
          workbooks_progress: null
        }
        strapi.plugins['users-permissions'].services.user.edit({id: user_id}, updateData);
      }
      return sanitizeEntity(entity, { model: strapi.models.workbooks });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'workbooks.delete',
          message: 'User is not allowed to delete a workbooks.',
        })
      );
    }
  },

  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    // Check if a disease exists for the workbook we're trying to create as
    // well as if the user is an editor.
    if (
      checkUserIsAnEditor(ctx) &&
      ctx.request.body.disease &&
      ctx.request.body.disease !== "" &&
      await strapi.query('diseases').findOne({id: ctx.request.body.disease})
    ) {
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.workbooks.create(data, { files });
      } else {
        entity = await strapi.services.workbooks.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.workbooks });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'workbooks.create',
          message: 'Something went wrong creating a workbook.',
        })
      );
    }
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    if (checkUserIsAnEditor(ctx)) {
      const { id } = ctx.params;

      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.workbooks.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.workbooks.update({ id }, ctx.request.body);
        let users = await strapi.plugins['users-permissions'].services.user.fetchAll({diseases: entity.disease});
        for(let user in users) {
          let user_id = users[user].id;
          let pages = await strapi.query('pages').find({diseases: entity.disease, genders: users[user].gender});
          let total_pages = 0;
          pages.forEach(page => {
            const found = entity.pages.find(wb_page => wb_page.pageId === page.id);
            if(found) {
              total_pages++;
            }
          })

          let updateData = {
            workbooks_progress: {
              completed_pages: users[user].workbooks_progress === null ? 0 : (users[user].workbooks_progress.completed_pages > total_pages ? total_pages : users[user].workbooks_progress.completed_pages),
              total_pages: total_pages,
              workbook_id: entity.id
            }
          }
          strapi.plugins['users-permissions'].services.user.edit({id: user_id}, updateData);
        }
      }

      return sanitizeEntity(entity, { model: strapi.models.workbooks });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'workbooks.update',
          message: 'User is not allowed to update a workbooks.',
        })
      );
    }
  },
};

async function checkUserIsAnEditor(ctx) {
  const user = await strapi.query('user', 'users-permissions').findOne({id: ctx.state.user.id});

  return (
    user &&
    user.additionalPermissions &&
    user.additionalPermissions.includes("editor")
  )
}
