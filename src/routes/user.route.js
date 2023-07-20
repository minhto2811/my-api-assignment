const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.post('/api/add/new', controller.addNew);


router.post('/api/login', controller.login);

module.exports = router;