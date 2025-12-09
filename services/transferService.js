const { users } = require('../models/userModel');
const { transfers } = require('../models/transferModel');

function transfer(req, res) {
  const { remetente, destinatario, valor } = req.body;
  if (!remetente || !destinatario || typeof valor !== 'number') {
    return res.status(400).json({ message: 'Remetente, destinatário e valor são obrigatórios.' });
  }
  const userFrom = users.find(u => u.username === remetente);
  const userTo = users.find(u => u.username === destinatario);
  if (!userFrom || !userTo) {
    return res.status(404).json({ message: 'Usuário remetente ou destinatário não encontrado.' });
  }
  if (userFrom.saldo < valor) {
    return res.status(400).json({ message: 'Saldo insuficiente.' });
  }
  const isFavorecido = userFrom.favorecidos && userFrom.favorecidos.includes(destinatario);
  if (!isFavorecido && valor >= 5000) {
    return res.status(403).json({ message: 'Transferências acima de R$ 5.000,00 só são permitidas para favorecidos.' });
  }
  userFrom.saldo -= valor;
  userTo.saldo += valor;
  transfers.push({ remetente, destinatario, valor, data: new Date() });
  return res.status(201).json({ message: 'Transferência realizada com sucesso.' });
}

module.exports = { transfer };
