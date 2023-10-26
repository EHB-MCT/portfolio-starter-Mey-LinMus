module.exports = {
  development: {
    client: 'mysql2',
  
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'dev5',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations', 
    },
    seeds: {
      directory: './db/seeds', 
    },
  },
};
