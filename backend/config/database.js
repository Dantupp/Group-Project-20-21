module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'projectcluster.hdr71.mongodb.net'),
        srv: env.bool('DATABASE_SRV', true),
        port: env.int('DATABASE_PORT', ),
        database: env('DATABASE_NAME', 'backend_database'),
        username: env('DATABASE_USERNAME', process.env.DB_USERNAME),
        password: env('DATABASE_PASSWORD', process.env.DB_PASSWORD),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
