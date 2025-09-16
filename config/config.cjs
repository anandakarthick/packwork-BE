require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "packwork_new",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: (process.env.DB_NAME || "packwork_new") + "_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: (process.env.DB_NAME || "packwork_new") + "_prod",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql"
  }
};
