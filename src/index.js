require('dotenv').config();
const { dependenciesContainer, registerDependencies } = require('./utils/dependency-injection');

registerDependencies();

async function main() {
    const taskEmitter = dependenciesContainer.resolve('taskEmitter');
    const transactionsEtlService = dependenciesContainer.resolve('transactionsEtlService');

    taskEmitter.scheduleTask(Number(process.env.TRANSACTION_FETCH_INTERVAL), async () => {
        await transactionsEtlService.extractBlockTransactions();
    })
}

main()