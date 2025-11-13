const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2028@Robertoana',
  database: 'musica'
});

// Servir os arquivos HTML da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listar músicas
app.get("/musicas", (req, res) => {
  db.query("SELECT * FROM musicas", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Adicionar música
app.post("/musicas", (req, res) => {
  const { nome, cantor, repertorio } = req.body;
  db.query("INSERT INTO musicas (nome, cantor, repertorio) VALUES (?, ?, ?)", [nome, cantor, repertorio], err => {
    if (err) return res.status(500).send(err);
    res.send("Música adicionada!");
  });
});

// Listar agenda
app.get("/agenda", (req, res) => {
  db.query("SELECT * FROM agenda", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Adicionar dia na agenda
app.post("/agenda", (req, res) => {
  const { data, descricao } = req.body;
  db.query("INSERT INTO agenda (data, descricao) VALUES (?, ?)", [data, descricao], err => {
    if (err) return res.status(500).send(err);
    res.send("Dia adicionado na agenda!");
  });
});

// Listar histórico
app.get("/historico", (req, res) => {
  db.query("SELECT * FROM historico", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// 🔹 Corrigido: usar porta dinâmica do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
