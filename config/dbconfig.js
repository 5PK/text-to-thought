var Sequelize = require("sequelize")

const isPsql = process.env.DB_TYPE === "psql";
const isMysql = process.env.DB_TYPE === "mysql";
const isSqlite = process.env.DB_TYPE === "sqlite";

console.log(process.env.DB_TYPE)

var connectionString;
if (isPsql) {
    connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
} else if (isMysql) {
    connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
} else if (isSqlite) {
    connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

}

if (isSqlite) {

    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'config/db.sqlite'
    });

    module.exports = sequelize;

} else {

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
}



