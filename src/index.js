require('dotenv').config();
const express = require('express');
const router = require('./utils/router');
const { dependenciesContainer, registerDependencies } = require('./utils/dependency-injection');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

registerDependencies();

// SERVER CONFIGS
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 8000;

// DEPENDENCIES INJECTIONS
const fetchBlockTaskEmitter = dependenciesContainer.resolve('taskEmitter');
const extractTransactionsTaskEmitter = dependenciesContainer.resolve('taskEmitter');
const transactionsEtlService = dependenciesContainer.resolve('transactionsEtlService');
const dbConnection = dependenciesContainer.resolve('dbConnection');
const swaggerOptions = dependenciesContainer.resolve('swaggerOptions');

const swaggerSpecifications = swaggerJsDoc(swaggerOptions);

async function main() {
    dbConnection.sequelize.authenticate()
    .then(() => {
        console.log('Connection to Database has been established successfully.');
    })
    .catch(error => {
        console.log(`Error while connecting to DB: ${error}`);
    })

    app.use(express.json());
    app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(swaggerSpecifications));
    app.use('/', router);

    app.listen(SERVER_PORT, () => {
        console.log(`REST server is listening on port: ${SERVER_PORT}`);
    })

    fetchBlockTaskEmitter.scheduleTask(Number(process.env.BLOCKS_FETCH_INTERVAL), async () => {
        await transactionsEtlService.fetchLatestBlock();
    })

    extractTransactionsTaskEmitter.scheduleTask(Number(process.env.TRANSACTIONS_EXTRACT_INTERVAL), async () => {
        await transactionsEtlService.extractBlockTransactions();
    })
}

process
    .on('uncaughtException', () => {
        fetchBlockTaskEmitter.clearTask();
        extractTransactionsTaskEmitter.clearTask();
    })

main()