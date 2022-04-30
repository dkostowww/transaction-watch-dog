require('dotenv').config();
const { dependenciesContainer, registerDependencies } = require('./utils/dependency-injection');

registerDependencies();

const fetchBlockTaskEmitter = dependenciesContainer.resolve('taskEmitter');
const extractTransactionsTaskEmitter = dependenciesContainer.resolve('taskEmitter');
const transactionsEtlService = dependenciesContainer.resolve('transactionsEtlService');

async function main() {
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