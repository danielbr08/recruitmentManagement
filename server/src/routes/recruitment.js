const express = require('express');
const router = express.Router();

const recruitmentController = require('../controllers/recruitmentController')

// localhost:3000/api/recruitment

/* GET users listing. */
router.get('/soldiers-list', recruitmentController.getSoldiersList);
router.get('/soldiers-names-list', recruitmentController.getSoldiersNamesList);
router.get('/names-lists', recruitmentController.getNamesLists);
router.get('/tasks', recruitmentController.getTasks);
router.post('/update-task', recruitmentController.updateTask);
router.get('/current-task', recruitmentController.getCurrentTask);
router.get('/max-pakal-id', recruitmentController.getMaxPakalId);
router.get('/max-signature-item-id', recruitmentController.getMaxSignatureItemId);
router.get('/pakals-full', recruitmentController.getPakalsFull);
router.get('/pakals', recruitmentController.getPakals);
router.post('/add-nameslist', recruitmentController.addNamesList);
router.post('/add-task', recruitmentController.addTask);
router.post('/save-pakals', recruitmentController.savePakals);

module.exports = router;