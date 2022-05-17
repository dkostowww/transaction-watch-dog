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
}

process
    .on('uncaughtException', () => {
        fetchBlockTaskEmitter.clearTask();
        extractTransactionsTaskEmitter.clearTask();
    })

main()