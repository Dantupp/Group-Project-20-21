module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.soton.ac.uk',
        port: '25',
        auth: {
          user: env('SMTP_USERNAME', process.env.SMTP_EMAIL),
          pass: env('SMTP_PASSWORD', process.env.SMTP_PASSWORD)
        },
      },
      settings: {
        defaultFrom: 'hello@example.com',
        defaultReplyTo: 'hello@example.com',
      },
    },
  });
