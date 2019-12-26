var Sequelize = require("sequelize");
require("dotenv/config")

const isProduction = process.env.NODE_ENV === "prod";
const isStaging = process.env.NODE_ENV === "staging";

var connectionString;
if (isProduction == true) {
  connectionString = `postgresql://${process.env.PROD_DB_USER}:${process.env.PROD_DB_PASSWORD}@${process.env.PROD_DB_HOST}:${process.env.PROD_DB_PORT}/${process.env.PROD_DB_NAME}`;
} else if (isStaging == true) {
  connectionString = `postgresql://${process.env.STG_DB_USER}:${process.env.STG_DB_PASSWORD}@${process.env.STG_DEV_DB_HOST}:${process.env.STG_DB_PORT}/${process.env.STG_DB_NAME}`;
} else {
  connectionString = `mysql://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_HOST}:${process.env.DEV_DB_PORT}/${process.env.DEV_DB_NAME}`;
}

const sequelize = new Sequelize(
  connectionString,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
