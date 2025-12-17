
const express = require('express');


const { transfers } = require('../models/transferModel');

function createTransferController(transferService) {
	const router = express.Router();
	router.post('/', transferService.transfer);
	router.get('/', (req, res) => {
		res.status(200).json(transfers);
	});
	return router;
}

module.exports = createTransferController;
