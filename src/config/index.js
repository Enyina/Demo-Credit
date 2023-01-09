require("dotenv").config();

module.exports = {
  database: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    name: process.env.DB,
  },
};
