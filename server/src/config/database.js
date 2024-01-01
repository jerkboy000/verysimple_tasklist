require("dotenv").config();
const { Sequelize } = require("sequelize");
const logger = require("./logger");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  }
);

// Connect to the database and sync models
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection established successfully");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    logger.info("All models were synchronized successfully");
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database or sync models: ${err.message}`);
  });

module.exports = sequelize;
