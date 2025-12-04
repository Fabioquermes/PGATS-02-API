// Dependencias ou Bibliotecas

const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicacao
const app = require('../../app');
// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informa remetente e destinatario inexistente recebo 400', async () => {
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
    });

    describe('GET /transfers', () => {

    });
});    