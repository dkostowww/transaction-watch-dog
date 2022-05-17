const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    }
)

const dbConnection = {};

dbConnection.Sequelize = Sequelize;
dbConnection.sequelize = sequelize;

module.exports = dbConnection