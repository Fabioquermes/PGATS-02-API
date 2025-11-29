# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras básicas de negócio. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   ```
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Estrutura de Diretórios
- `controllers/` — Lógica dos endpoints
- `services/` — Regras de negócio
- `models/` — Dados em memória
- `app.js` — Configuração do app Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## Como rodar

```bash
node server.js
```

Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

### Registro de usuário
- `POST /users/register`
- Body: `{ "username": "string", "password": "string", "favorecidos": ["string"] }`

### Login
- `POST /users/login`
- Body: `{ "username": "string", "password": "string" }`

### Listar usuários
- `GET /users`

### Transferência
- `POST /transfers`
- Body: `{ "remetente": "string", "destinatario": "string", "valor": number }`

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para "favorecidos".
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

---

Para dúvidas ou sugestões, utilize a documentação Swagger ou abra uma issue no repositório.
