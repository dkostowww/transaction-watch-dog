
const dbConnection = require('../utils/database-connection');

const database = dbConnection;

// INCLUDE ALL TABLES TO THE DB OBJECT
database.configurations = require('../models/Configuration')(database.sequelize, database.Sequelize);

module.exports = database;