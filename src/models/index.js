const { dependenciesContainer } = require('../utils/dependency-injection');
const dbConnection = dependenciesContainer.resolve('dbConnection');

const database = dbConnection;

// INCLUDE ALL TABLES TO THE DB OBJECT
database.configurations = require('../models/Configuration')(database.sequelize, database.Sequelize);
database.transactions = require('../models/Transaction')(database.sequelize, database.Sequelize);

// DEFINE TABLE RELATIONS
database.configurations.hasMany(database.transactions, {
    foreignKey: 'configuration_id',
    as: 'Transactions'
});

database.transactions.belongsTo(database.configurations, {
    foreignKey: 'configuration_id',
    as: 'Configuration'
});

module.exports = database;