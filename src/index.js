require('dotenv').config();
const { dependenciesContainer, registerDependencies } = require('./utils/dependency-injection');

registerDependencies();

const fetchBlockTaskEmitter = dependenciesContainer.resolve('taskEmitter');
const extractTransactionsTaskEmitter = dependenciesContainer.resolve('taskEmitter');
const transactionsEtlService = dependenciesContainer.resolve('transactionsEtlService');
const dbConnection = dependenciesContainer.resolve('dbConnection');

async function main() {
    dbConnection.sequelize.authenticate()
    .then(() => {
        console.log('Connection to Database has been established successfully.');
    })
    .catch(error => {
        console.log(`Error while connecting to DB: ${error}`);
    })

    fetchBlockTaskEmitter.scheduleTask(Number(process.env.TRANSACTION_FETCH_INTERVAL), async () => {
        await transactionsEtlService.fetchLatestBlock();
    })

    extractTransactionsTaskEmitter.scheduleTask(Number(process.env.TRANSACTION_FETCH_INTERVAL), async () => {
        await transactionsEtlService.extractBlockTransactions();
    })
}

process
    .on('uncaughtException', () => {
        fetchBlockTaskEmitter.clearTask();
        extractTransactionsTaskEmitter.clearTask();
    })

main()