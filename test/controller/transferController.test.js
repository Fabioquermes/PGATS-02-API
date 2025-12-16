// Dependencias ou Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const express = require('express');
const userController = require('../../controllers/userController');
const createTransferController = require('../../controllers/transferController');

// Mocks
const transferService = require('../../services/transferService');
const userService = require('../../services/userService');
const Sinon = require('sinon');
const { describe } = require('mocha');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informa remetente e destinatario inexistente recebo 404', async () => {
            // Usa o transferService real
            const app = express();
            app.use(express.json());
            app.use('/users', userController);
            app.use('/transfers', createTransferController(transferService));
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "fabio",
                    destinatario: "priscila",
                    valor: 100  
                });
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Usuário remetente ou destinatário não encontrado.');           
        });
        
        it('Usando Mocks: Quando informa remetente e destinatario inexistente recebo 404', async () => {
            // Mock do serviço de transferência
            const transferServiceMock = { transfer: sinon.stub().callsFake((req, res) => {
                return res.status(404).json({ message: 'Usuário remetente ou destinatário não encontrado.' });
            }) };
            const app = express();
            app.use(express.json());
            app.use('/users', userController);
            app.use('/transfers', createTransferController(transferServiceMock));
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "fabio",
                    destinatario: "priscila",
                    valor: 100  
                });
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Usuário remetente ou destinatário não encontrado.');
        });

        it('Usando Mocks: Quando informo valores validos eu tenho sucesso com 201 CREATED', async () => {
            // Mock do serviço de transferência
            const transferServiceMock = { transfer: sinon.stub().callsFake((req, res) => {
                return res.status(201).json({ message: 'Transferência realizada com sucesso.' });
            }) };
            const app = express();
            app.use(express.json());
            app.use('/users', userController);
            app.use('/transfers', createTransferController(transferServiceMock));
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "fabio",
                    destinatario: "priscila",
                    valor: 99  
                });
            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('message', 'Transferência realizada com sucesso.');
        });
    });

    describe('GET /trasfers', () => { 
        // Its ficam aqui
    });
});