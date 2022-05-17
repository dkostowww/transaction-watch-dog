const dbConnection = require('../utils/database-connection');

const database = dbConnection;

// INCLUDE ALL TABLES TO THE DB OBJECT
database.transactions = require('../models/Transaction')(database.sequelize, database.Sequelize);

module.exports = database;