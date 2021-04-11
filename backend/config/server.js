module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e1c5fcc09d6a55497bc822a40c2160df'),
    },
  },
  cron: {
    enabled: false
  }
});
