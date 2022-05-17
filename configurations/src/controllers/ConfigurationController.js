const db = require('../models');
const helperFunctions = require('../utils/helper-functions');

class ConfigurationController {

    async createConfiguration(request, response) {
        const configurationData = {
            name: request.body.name,
            options: JSON.stringify(request.body.options)
        };

        try {
            if (!helperFunctions.validateOptionsObject(request.body.options)) {
                throw new Error('Options object does not containt the required properties');
            }

            const createdConfiguration = await db.configurations.create(configurationData);

            response.status(200).send({
                id: createdConfiguration.id,
                name: createdConfiguration.name,
                options: JSON.parse(createdConfiguration.options)
            });
        } catch(error) {
            response.status(500).json(error.message);
            console.error(error);
        }
    }

    async getAllConfigurations(request, response) {
        try {
            const allConfigurations = await db.configurations.findAll();

            const parsedConfigurations = allConfigurations.map(configuration => ({
                id: configuration.id,
                name: configuration.name,
                options: JSON.parse(configuration.options)
            }));

            response.status(200).send(parsedConfigurations);
        } catch (error) {
            response.status(500).json(error.message);
            console.error(error);
        }
    }

    async getConfiguration(request, response) {
        const configurationId = request.params.id;

        try {
            const configuration = await db.configurations.findOne({ where: { id: configurationId }});

            if (!configuration) {
                response.sendStatus(404);
            }

            response.status(200).send({
                id: configuration.id,
                name: configuration.name,
                options: JSON.parse(configuration.options)
            });
        } catch (error) {
            response.status(500).json(error.message);
            console.error(error);
        }
    }

    async getConfigurationTransactions(request, response) {
        const configurationId = request.params.id;
        try {
            // Use Transactions endpoint to fetch all configuration transactions
            const data = await  db.configurations.findOne({
                include: [{
                    model: db.transactions,
                    as: 'transactions'
                }],
                where: { id: configurationId }
            })

            if (!data) {
                response.sendStatus(404);
            }
    
            response.status(200).send({
                id: data.id,
                name: data.name,
                options: JSON.parse(data.options),
                transactions: data.transactions
            });    
        } catch (error) {
            response.status(500).json(error.message);
            console.error(error);
        }
    }

    async updateConfiguration(request, response) {
        let configurationId = request.params.id;
        const configurationData = {
            name: request.body.name,
            options: JSON.stringify(request.body.options)
        };

        try {
            if (!helperFunctions.validateOptionsObject) {
                throw new Error('Options object does not containt the required properties');
            }

            await db.configurations.update(configurationData, { where: { id: configurationId }});

            response.status(200).send({ success: "true" });
        } catch (error) {
            response.status(500).json(error.message);
            console.error(error);
        }
    }

    async deleteConfiguration(request, response) {
        let configurationId = request.params.id;

        try {
            await db.configurations.destroy({ where: { id: configurationId }});

            response.status(200).send({ success: "true" });
        } catch (error) {
            response.status(500).json(error.message);
            console.error(error);
        }
    }
}

module.exports = new ConfigurationController();