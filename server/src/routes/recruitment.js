const express = require('express');
const router = express.Router();

const recruitmentController = require('../controllers/recruitmentController')

/* GET users listing. */
router.get('/users-list', recruitmentController.getUsersList);

module.exports = router;