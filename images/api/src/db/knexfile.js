module.exports = {
  development: {
    client: "pg",

    connection: {
      host: process.env.POSTGRES_HOST || "127.0.0.1",
      user: process.env.POSTGRES_USER || "test",
      password: process.env.POSTGRES_PASSWORD || "test",
      database: process.env.POSTGRES_DB || "test",
    },

    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
