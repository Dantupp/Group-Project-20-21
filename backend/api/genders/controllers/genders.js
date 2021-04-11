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
   * Create a record.
   *
   * @return {Object}
   */
  async create(ctx) {
    if (checkUserIsAnEditor(ctx)) {
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.genders.create(data, { files });
      } else {
        entity = await strapi.services.genders.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.genders });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'genders.create',
          message: 'Something went wrong adding a gender.',
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
        entity = await strapi.services.genders.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.genders.update({ id }, ctx.request.body);
      }
  
      return sanitizeEntity(entity, { model: strapi.models.genders });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'genders.update',
          message: 'Something went wrong updating a gender.',
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

      const entity = await strapi.services.genders.delete({ id });
      return sanitizeEntity(entity, { model: strapi.models.genders });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'genders.delete',
          message: 'User is not allowed to delete a genders.',
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
