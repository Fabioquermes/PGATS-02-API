// Dependencias ou Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

const transferService = require('../../services/transferService');

const express = require('express');
const userController = require('../../controllers/userController');
const createTransferController = require('../../controllers/transferController');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informa remetente e destinatario inexistente recebo 404', async () => {
            // Usa o transferService real
            const app = express();
            app.use(express.json());
            app.use('/users', userController);
            app.use('/transfers', createTransferController(transferService));
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .send({
                    remetente: "fabio",
                    destinatario: "priscila",
                    valor: 100  
                });
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Usuário remetente ou destinatário não encontrado.');           
        });
    });
});