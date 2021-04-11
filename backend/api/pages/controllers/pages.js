'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity, parseMultipartData } = require('strapi-utils');
const _ = require('lodash');
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

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
        entity = await strapi.services.pages.create(data, { files });
      } else {
        entity = await strapi.services.pages.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.pages });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'pages.create',
          message: 'User is not allowed to create a pages.',
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

      // See if we are updating the diseases.
      if (ctx.request.body.diseases) {
        // We now need to check if the new diseases list impacts any of the
        // current workbooks. We shouldn't remove a disease if the page is
        // in use by the diseases workbook.

        // See if any workbooks match the page ID and any of the diseases.
        const workbooksInUse = await strapi.services.workbooks.find({
          pages_in: {pageId: id},
          disease_nin: ctx.request.body.diseases
        });

        // If we get any workbooks back, it means the page is still being used
        // in those workbooks despite trying to remove the disease of those
        // workbooks from the page.

        // If this is the case, we will return an error since the request
        // should not contain any disease IDs which are still in use by
        // workbooks.
        if (workbooksInUse.length > 0) {
          return ctx.badRequest(
            null,
            formatError({
              id: 'pages.update',
              message:  'One or more diseases are still being used in other ' +
                        'workbooks.',
            })
          );
        }
      }

      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.pages.update({ id }, data, {
          files,
        });
      } else {
        if(_.has(ctx.request.body, "genders")){
          let page = await strapi.query('pages').findOne({id: id});
          let users = await strapi.plugins['users-permissions'].services.user.fetchAll({diseases: page.diseases});
          users.forEach(async user => {
            let total_pages = 0;
            let workbook_id = '';
            if(user.workbooks_progress) {
              workbook_id = user.workbooks_progress.workbook_id;
              total_pages = user.workbooks_progress.total_pages;
              let workbook = await strapi.query('workbooks').findOne({id: user.workbooks_progress.workbook_id});
              const found_page = workbook.pages.find(wb_page => wb_page.pageId === page.id);
              if(found_page) {
                const found_gender = page.genders.find(gender => gender.id === user.gender.id)
                if(found_gender) {
                  const found_new_gender = ctx.request.body.genders.includes(user.gender.id);
                  if(!found_new_gender) {
                    total_pages--;
                    workbook_id = workbook.id;
                  }
                }
                else {
                  const found_new_gender = ctx.request.body.genders.includes(user.gender.id);
                  if(found_new_gender) {
                    total_pages++;
                    workbook_id = workbook.id;
                  }
                }
              }
            }
            else {
              let workbook = await strapi.query('workbooks').findOne({disease: user.diseases[0]});
              const found_page = workbook.pages.find(wb_page => wb_page.pageId === page.id);
              if(found_page) {
                const found_new_gender = ctx.request.body.genders.includes(user.gender.id);
                if(found_new_gender) {
                  total_pages++;
                  workbook_id = workbook.id;
                }
              }
            }

            let updateData = {
              workbooks_progress: {
                completed_pages: user.workbooks_progress === null ? 0 : (user.workbooks_progress.completed_pages > total_pages ? total_pages : user.workbooks_progress.completed_pages),
                total_pages: total_pages,
                workbook_id: workbook_id
              }
            }
            let id = user.id;
            const data = await strapi.plugins['users-permissions'].services.user.edit({id}, updateData);
          })
        }

        entity = await strapi.services.pages.update({ id }, ctx.request.body);
      }

      return sanitizeEntity(entity, { model: strapi.models.pages });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'pages.update',
          message: 'User is not allowed to update a pages.',
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

      const workbooksInUse = await strapi.services.workbooks.find({
        pages_in: {pageId: id}
      });

      // If we get any workbooks back, it means the page is still being used
      // in those workbooks despite trying to remove the disease of those
      // workbooks from the page.

      // If this is the case, we will return an error since the request
      // should not contain any disease IDs which are still in use by
      // workbooks.
      if (workbooksInUse.length > 0) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'pages.delete',
            message:  'This page is still being used in other workbooks.'
          })
        );
      }

      const entity = await strapi.services.pages.delete({ id });
      return sanitizeEntity(entity, { model: strapi.models.pages });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'pages.delete',
          message: 'User is not allowed to delete a pages.',
        })
      );
    }
  },
}

async function checkUserIsAnEditor(ctx) {
    const user = await strapi.query('user', 'users-permissions').findOne({id: ctx.state.user.id});

    return (
      user &&
      user.additionalPermissions &&
      user.additionalPermissions.includes("editor")
    )
  }
