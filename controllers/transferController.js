
const express = require('express');

function createTransferController(transferService) {
	const router = express.Router();
	router.post('/', transferService.transfer);
	return router;
}

module.exports = createTransferController;
