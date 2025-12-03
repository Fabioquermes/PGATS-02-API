const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/register', userService.register);
router.post('/login', userService.login);
router.get('/', userService.getAll);

module.exports = router;
