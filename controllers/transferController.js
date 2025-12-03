const express = require('express');
const router = express.Router();
const transferService = require('../services/transferService');

router.post('/', transferService.transfer);

module.exports = router;
