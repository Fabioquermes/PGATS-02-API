const { users } = require('../models/userModel');

function register(req, res) {
  const { username, password, favorecidos = [] } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Usuário já registrado.' });
  }
  users.push({ username, password, favorecidos, saldo: 10000 });
  return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
}

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }
  return res.status(200).json({ message: 'Login realizado com sucesso.' });
}

function getAll(req, res) {
  return res.json(users.map(u => ({ username: u.username, favorecidos: u.favorecidos, saldo: u.saldo })));
}

module.exports = { register, login, getAll };
