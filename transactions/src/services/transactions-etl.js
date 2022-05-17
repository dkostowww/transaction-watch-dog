const Web3 = require('web3');
const db = require('../models');
const helperFunctions = require('../utils/helper-functions');
const axios = require('axios').default;

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

    async fetchLatestBlock() {
        try {
            const block = await this.web3.eth.getBlock('latest');

            if (this.blocks.length === 0 || block.number !== this.blocks[this.blocks.length - 1].number) {
                console.info(`Block: ${block.number} stored.`)
                this.blocks.push(block);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async extractBlockTransactions() {
        if (this.blocks.length === 0) {
            return;
        }

        try {
            const oldestBlock = this.blocks[0];
            const blockNumber = oldestBlock.number;
            const transactionsForMatching = [];

            const allConfigurationsResponse = await axios.get('http://localhost:5000/getAllConfigurations');
            const allConfigurations = allConfigurationsResponse.data;

            if (oldestBlock !== null && oldestBlock.transactions !== null && blockNumber !== this.lastProcessedBlock) {
                console.info(`Checking all transactions from block ${blockNumber}`);
                this.lastProcessedBlock = blockNumber;

                for (const transactionHash of oldestBlock.transactions) {
                    const transaction = await this.web3.eth.getTransaction(transactionHash);
                    transactionsForMatching.push(this.matchTransactionToConfiguration(transaction, allConfigurations));
                }

                Promise.all([...transactionsForMatching]);

                this.blocks.shift();
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async matchTransactionToConfiguration(transaction, allConfigurations) {
        try {
            for (const configuration of allConfigurations) {
                const transactionMatchesConfiguration = await this.transactionMatchesConfiguration(transaction, JSON.parse(configuration.options));

                if (transactionMatchesConfiguration === true) {
                    await this.loadTransaction(transaction, configuration.id);
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async loadTransaction(transaction, configurationId) {
        try {
            const transactionData = {
                configuration_id: configurationId,
                hash: transaction.hash,
                nonce: transaction.nonce,
                block_hash: transaction?.blockHash,
                block_number: transaction?.blockNumber,
                transaction_index: transaction?.transactionIndex,
                from: transaction.from,
                to: transaction?.to,
                value: transaction.value,
                gas_price: transaction.gasPrice,
                gas: transaction.gas,
                input: transaction.input
            }
            
            await db.transactions.create(transactionData);
            console.info(`Transaction ${transactionData.hash} matching configuration: ${configurationId}`);
        } catch (error) {
            throw new Error(error);
        }
    }

    async transactionMatchesConfiguration(transaction, configurationOptions) {
        const field = configurationOptions?.field;
        const operator = configurationOptions?.operator;
        const value = configurationOptions?.value;

        if (!transaction.hasOwnProperty(field)) {
            throw new Error(`Field ${field} is missing in transaction object!`);
        }

        const conditionMet = await helperFunctions.compareValues(transaction[field], value, operator);

        if (conditionMet === true) {
            return true;
        }

        return false;
    }
}

module.exports = TransactionsEtlService;