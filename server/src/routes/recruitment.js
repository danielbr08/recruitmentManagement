const express = require('express');
const router = express.Router();

const recruitmentController = require('../controllers/recruitmentController')

/* GET users listing. */
router.get('/users-list', recruitmentController.getUsersList);
router.get('/names-lists', recruitmentController.getNamesLists);
router.post('/add-nameslist', recruitmentController.addNamesList);
router.post('/save-warehouse-unit', recruitmentController.saveWarehouseUnit);

module.exports = router;