const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controllers/userController');
const createTransferController = require('./controllers/transferController');
const transferService = require('./services/transferService');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userController);
app.use('/transfers', createTransferController(transferService));

module.exports = app;
