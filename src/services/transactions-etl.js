const Web3 = require('web3');

class TransactionsEtlService {
    web3;
    account;
    lastProcessedBlock;
    blocks = [];

    constructor({ projectId }) {
        this.projectId = projectId;
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + this.projectId));
        this.account = '0x0988c35f6B568ef43aA372704AF43327233e5E6C'.toLowerCase();
    }

    async fetchLatestBlocks() {
        const block = await this.web3.eth.getBlock('latest');

        if (this.blocks.length === 0 || block.number !== this.blocks[this.blocks.length - 1].number) {
            console.info(`Block: ${block.number} stored.`)
            this.blocks.push(block);
        }
    }

    async extractBlockTransactions() {
        if (this.blocks.length === 0) {
            return;
        }
        const oldestBlock = this.blocks[0];

        const blockNumber = oldestBlock.number;
        const transactionsForTransforming = [];

        if (oldestBlock !== null && oldestBlock.transactions !== null && blockNumber !== this.lastProcessedBlock) {
            console.info(`Fetching all transactions from block ${blockNumber}`);
            this.lastProcessedBlock = blockNumber;

            for (const transactionHash of oldestBlock.transactions) {
                const transaction = await this.web3.eth.getTransaction(transactionHash);
                transactionsForTransforming.push(this.transformTransactions(transaction));
            }

            Promise.all([...transactionsForTransforming]);

            this.blocks.shift();
        }
    }

    async transformTransactions(transaction, _configuration) {
        await this.loadTransaction(transaction);
    }

    async loadTransaction(transaction, _configurationId) {
    }
}

module.exports = TransactionsEtlService;