// Dependencias ou Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicacao
const app = require('../../app');

// Mocks
const transferService = require('../../services/transferService');
const userService = require('../../services/userService');
const Sinon = require('sinon');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informa remetente e destinatario inexistente recebo 404', async () => {
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
            const transferMock = sinon.stub(transferService, 'transfer');
            transferMock.throws({ status: 404, message: 'Usuário remetente ou destinatário não encontrado.' });


            const resposta = await request(app)
                .post('/transfers')
                .send({
                    remetente: "fabio",
                    destinatario: "priscila",
                    valor: 100  
                });
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Usuário remetente ou destinatário não encontrado.');
            
            // Restaura o comportamento original do serviço após o teste
            sinon.restore();
        });
    });

    describe('GET /transfers', () => {

    });
});    