const awilix = require('awilix');
const TaskEmitter = require('./task-emitter');
const dbConnection = require('./database-connection');
const swaggerOptions = require('./swagger');

const dependenciesContainer = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

function registerDependencies() {
    dependenciesContainer.register({
        taskEmitter: awilix.asClass(TaskEmitter),
        dbConnection: awilix.asValue(dbConnection),
        projectId: awilix.asValue(process.env.INFURA_ID),
        swaggerOptions: awilix.asValue(swaggerOptions)
    })
}

module.exports = {
    dependenciesContainer,
    registerDependencies
}