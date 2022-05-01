const router = require('express').Router()
const configurationController = require('../controllers/ConfigurationController')

// Configuration routes
router.post('/createConfiguration', configurationController.createConfiguration);
router.get('/getAllConfigurations', configurationController.getAllConfigurations);
router.get('/getConfiguration/:id?', configurationController.getConfiguration);
router.get('/getConfigurationTransactions/:id?', configurationController.getConfigurationTransactions);
router.put('/updateConfiguration/:id', configurationController.updateConfiguration);
router.delete('/deleteConfiguration/:id', configurationController.deleteConfiguration);

module.exports = router