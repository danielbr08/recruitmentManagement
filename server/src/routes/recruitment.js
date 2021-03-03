const express = require('express');
const router = express.Router();

const recruitmentController = require('../controllers/recruitmentController')

/* GET users listing. */
router.get('/soldiers-list', recruitmentController.getSoldiersList);
router.get('/names-lists', recruitmentController.getNamesLists);
router.get('/pakals', recruitmentController.getPakals);
router.post('/add-nameslist', recruitmentController.addNamesList);
router.post('/save-pakals', recruitmentController.savePakals);

module.exports = router;