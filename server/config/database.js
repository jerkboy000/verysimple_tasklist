require("dotenv").config();
const { Sequelize } = require("sequelize");
const logger = require("../src/logger");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  },
);

// Connect to database
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection established successfully");
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database: ${err.message}`);
  });

module.exports = sequelize;
