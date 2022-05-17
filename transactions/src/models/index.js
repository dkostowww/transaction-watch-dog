
const dbConnection = require('../utils/database-connection');

const database = dbConnection;

// INCLUDE ALL TABLES TO THE DB OBJECT
// database.configurations = require('../models/Configuration')(database.sequelize, database.Sequelize);
database.transactions = require('../models/Transaction')(database.sequelize, database.Sequelize);

// DEFINE TABLE RELATIONS
// database.configurations.hasMany(database.transactions, {
//     foreignKey: 'configuration_id',
//     as: 'transactions'
// });

database.transactions.belongsTo(database.configurations, {
    foreignKey: 'configuration_id',
    as: 'configuration'
});

module.exports = database;