'use strict';

const { sanitizeEntity, parseMultipartData } = require('strapi-utils');
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
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
        entity = await strapi.services.diseases.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.diseases.update({ id }, ctx.request.body);
      }
  
      return sanitizeEntity(entity, { model: strapi.models.diseases });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'diseases.update',
          message: 'Something went wrong updating a disease.',
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
    if (checkUserIsAnEditor(ctx)) {
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.diseases.create(data, { files });
      } else {
        entity = await strapi.services.diseases.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.diseases });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'diseases.create',
          message: 'Something went wrong creating a disease.',
        })
      );
    }
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */
  async delete(ctx) {
    if (checkUserIsAnEditor(ctx)) { 
      const { id } = ctx.params;

      const diseaseToDelete = await strapi.services.diseases.findOne({ id });

      if (diseaseToDelete.workbook) {
        // Disease cannot be deleted until workbook has been removed.
        return ctx.badRequest(
          null,
          formatError({
            id: 'diseases.delete',
            message: 'Unable to delete. A workbook currently exists for that disease.',
          })
        );
      } else {
        const entity = await strapi.services.diseases.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.diseases });
      }
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'diseases.delete',
          message: 'User is not allowed to delete a diseases.',
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
  