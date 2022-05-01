const awilix = require('awilix');
const TaskEmitter = require('./task-emitter');
const TransactionsEtlService = require('../services/transactions-etl');
const dbConnection = require('./database-connection');

const dependenciesContainer = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

function registerDependencies() {
    dependenciesContainer.register({
        taskEmitter: awilix.asClass(TaskEmitter),
        transactionsEtlService: awilix.asClass(TransactionsEtlService),
        dbConnection: awilix.asValue(dbConnection),
        projectId: awilix.asValue(process.env.INFURA_ID)
    })
}

module.exports = {
    dependenciesContainer,
    registerDependencies
}