const router = require('express').Router()
const configurationController = require('../controllers/ConfigurationController')

// Configuration routes

/**
 * @swagger
 * components:
 *   schemas:
 *     Configuration:
 *       type: object
 *       required:
 *         - name
 *         - options
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Configuration
 *         name:
 *           type: string
 *           description: The name of the configuration
 *         options:
 *           type: object
 *           description: The options of the configuration
 *           properties:
 *              field:
 *                  type: string
 *              operator:
 *                  type: string
 *              value:
 *                  type: string
 *       example:
 *         id: 1
 *         name: Filter transaction for certain recepient
 *         options: {
 *              field: 'to',
 *              operator: '=',
 *              value: '1234'
 *         }
 */

/**
  * @swagger
  * tags:
  *   name: Configurations
  *   description: The configurations API
  */

/**
 * @swagger
 * /createConfiguration:
 *   post:
 *     summary: Create a new configuration
 *     tags: [Configurations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuration'
 *     responses:
 *       200:
 *         description: The configuration was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Configuration'
 *       500:
 *         description: The server error while creating configuration
 */
router.post('/createConfiguration', configurationController.createConfiguration);

/**
 * @swagger
 * /getAllConfigurations:
 *   get:
 *     summary: Returns the list of all configurations
 *     tags: [Configurations]
 *     responses:
 *       200:
 *         description: The list of the configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 *       500:
 *          description: The server error while retrieving configurations
 */
router.get('/getAllConfigurations', configurationController.getAllConfigurations);

/**
 * @swagger
 * /getConfiguration/{id}:
 *   get:
 *     summary: Get the configuration by id
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The configuration id
 *     responses:
 *       200:
 *         description: The configuration data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Configuration'
 *       404:
 *         description: The configuration was not found
 *       500:
 *          description: The server error while retrieving configuration
 */
router.get('/getConfiguration/:id', configurationController.getConfiguration);

/**
 * @swagger
 * /getConfigurationTransactions/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The configuration id
 *     responses:
 *       200:
 *         description: The configuration data with all related transactions included
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Configuration'
 *       404:
 *         description: The configuration was not found
 *       500:
 *          description: The server error while retrieving configuration with transactions
 */
router.get('/getConfigurationTransactions/:id', configurationController.getConfigurationTransactions);

/**
 * @swagger
 * /updateConfiguration/{id}:
 *  put:
 *    summary: Update a configuration by id
 *    tags: [Configurations]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The configuration id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Configuration'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Configuration'
 *      500:
 *        description: The server error while updating a configuration
 */
router.put('/updateConfiguration/:id', configurationController.updateConfiguration);

/**
 * @swagger
 * /deleteConfiguration/{id}:
 *   delete:
 *     summary: Remove a configuration by id
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the configuration
 * 
 *     responses:
 *       200:
 *         description: The configuration was deleted
 *       500:
 *         description: The server error while deleting the configuration
 */
router.delete('/deleteConfiguration/:id', configurationController.deleteConfiguration);

module.exports = router