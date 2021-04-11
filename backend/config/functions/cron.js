'use strict';

/**
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 *
 *
 *
 * GDP: There are a total of 6 cronjobs for each reminder option: each_day with 3 time of day options, morning, evening, night and also each_week with the same 3 time of day options
 */

async function getReminderMessage(user) {
  let reminderText = "";
  let wb_progress = user.workbooks_progress;

  if(wb_progress!==null) {
    if(wb_progress.completed_pages === 0) {
      reminderText = "<p>You still have not started your workbook.</p><p>You can access your workbook in the workbook page after you log in into your account!</p>"
    }
    else {
      if(wb_progress.completed_pages !== wb_progress.total_pages) {
        reminderText = "You are at page " + wb_progress.completed_pages + " out of " + wb_progress.total_pages +  " in your workbook.</p><p>Make sure to continually make progress.</p>";
      }
      else if(wb_progress !== 0) {
        reminderText = "<p>Congrats on finishing your workbook!</p>Your notifications will be turned off.</p><p>Make sure to log in into your account regularly to check for updates.</p>";
        //update user here
        let updateNotifs = {
          notifications_frequency: {frequency: "none", time_of_day: "none"}
        }
        let id = user._id;
        await strapi.plugins['users-permissions'].services.user.edit({id}, updateNotifs);
      }
    }
  }

  return reminderText;
};


module.exports = {

  //* * 7 * * *: each day morning (at 7AM)
  '30 * * * * *': async () => {
    let users = await strapi.plugins['users-permissions'].services.user.fetchAll();

    for(let i in users) {
      let user = users[i];

      if(user.notifications_frequency !== null && user.notifications_frequency.frequency === "each_day" && user.notifications_frequency.time_of_day === "morning") {

        let reminderText = await getReminderMessage(user);

        try {
          // Send an email to the user.
          await strapi.plugins['email'].services.email.send({
            to: user.email,
            from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
            subject: 'Workbook reminder!',
            text: reminderText,
            html: reminderText,
          });
        } catch (err) {
          return ctx.badRequest(null, err);
        }
      }
    }
  },

  //* * 17 * * *: each day evening (at 5PM)
  '10 * * * * *': async () => {
    let users = await strapi.plugins['users-permissions'].services.user.fetchAll();

    for(let i in users) {
      let user = users[i];

      if(user.notifications_frequency !== null && user.notifications_frequency.frequency === "each_day" && user.notifications_frequency.time_of_day === "evening") {

        let reminderText = await getReminderMessage(user);

        // try {
        //   // Send an email to the user.
        //   await strapi.plugins['email'].services.email.send({
        //     to: user.email,
        //     from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        //     subject: 'Workbook reminder!',
        //     text: reminderText,
        //     html: reminderText,
        //   });
        // } catch (err) {
        //   return ctx.badRequest(null, err);
        // }
      }
    }
  },

  //* * 22 * * *: each day night (at 10PM)
  '20 * * * * *': async () => {
    let users = await strapi.plugins['users-permissions'].services.user.fetchAll();

    for(let i in users) {
      let user = users[i];

      if(user.notifications_frequency !== null && user.notifications_frequency.frequency === "each_day" && user.notifications_frequency.time_of_day === "night") {

        let reminderText = await getReminderMessage(user);

        // try {
        //   // Send an email to the user.
        //   await strapi.plugins['email'].services.email.send({
        //     to: user.email,
        //     from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        //     subject: 'Workbook reminder!',
        //     text: reminderText,
        //     html: reminderText,
        //   });
        // } catch (err) {
        //   return ctx.badRequest(null, err);
        // }
      }
    }
  },

  //* * 7 * * 1: each week monday morning (at 7AM)
  '40 * * * * *': async () => {
    let users = await strapi.plugins['users-permissions'].services.user.fetchAll();

    for(let i in users) {
      let user = users[i];

      if(user.notifications_frequency !== null && user.notifications_frequency.frequency === "each_week" && user.notifications_frequency.time_of_day === "morning") {

        let reminderText = await getReminderMessage(user);

        // try {
        //   // Send an email to the user.
        //   await strapi.plugins['email'].services.email.send({
        //     to: user.email,
        //     from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        //     subject: 'Workbook reminder!',
        //     text: reminderText,
        //     html: reminderText,
        //   });
        // } catch (err) {
        //   return ctx.badRequest(null, err);
        // }
      }
    }
  },

  //* * 17 * * 1: each week monday evening (at 5PM)
  '50 * * * * *': async () => {
    let users = await strapi.plugins['users-permissions'].services.user.fetchAll();

    for(let i in users) {
      let user = users[i];

      if(user.notifications_frequency !== null && user.notifications_frequency.frequency === "each_week" && user.notifications_frequency.time_of_day === "evening") {

        let reminderText = await getReminderMessage(user);

        // try {
        //   // Send an email to the user.
        //   await strapi.plugins['email'].services.email.send({
        //     to: user.email,
        //     from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        //     subject: 'Workbook reminder!',
        //     text: reminderText,
        //     html: reminderText,
        //   });
        // } catch (err) {
        //   return ctx.badRequest(null, err);
        // }
      }
    }
  },

  //* * 22 * * 1: each day monday night (at 10PM)
  '00 * * * * *': async () => {
    let users = await strapi.plugins['users-permissions'].services.user.fetchAll();

    for(let i in users) {
      let user = users[i];

      if(user.notifications_frequency !== null && user.notifications_frequency.frequency === "each_day" && user.notifications_frequency.time_of_day === "night") {

        let reminderText = await getReminderMessage(user);

        // try {
        //   // Send an email to the user.
        //   await strapi.plugins['email'].services.email.send({
        //     to: user.email,
        //     from: `Genetic Test Sharing <${process.env.SMTP_EMAIL}>`,
        //     subject: 'Workbook reminder!',
        //     text: reminderText,
        //     html: reminderText,
        //   });
        // } catch (err) {
        //   return ctx.badRequest(null, err);
        // }
      }
    }
  }
};
