const Web3 = require('web3');

class TransactionsEtlService {
    web3;
    account;
    previousBlockNumber;

    constructor({ projectId }) {
        this.projectId = projectId;
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + this.projectId));
        this.account = '0x0988c35f6B568ef43aA372704AF43327233e5E6C'.toLowerCase();
    }

    async extractBlockTransactions() {
        const block = await this.web3.eth.getBlock('latest');
        const blockNumber = block.number;
        const transactionsForTransforming = [];

        if (block !== null && block.transactions !== null && blockNumber !== this.previousBlockNumber) {
            console.log(`Fetching all transactions from block ${blockNumber}`);
            this.previousBlockNumber = blockNumber;

            for (const transactionHash of block.transactions) {
                const transaction = await this.web3.eth.getTransaction(transactionHash);
                transactionsForTransforming.push(this.transformTransactions(transaction));
            }

            console.time('promise');
            Promise.all([...transactionsForTransforming]);
            console.timeEnd('promise')
        }
    }

    async transformTransactions(transaction, _configuration) {
        await this.loadTransaction(transaction);
    }

    async loadTransaction(transaction, _configurationId) {
    }
}

module.exports = TransactionsEtlService;