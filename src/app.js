const express = require('express');
const cors = require('cors'); // Importa o CORS
const routes = require('./routes/app');

const app = express();

// Middleware de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições do frontend no Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Middleware de JSON para parsear o corpo das requisições
app.use(express.json());

// Registra todas as rotas
routes(app);

module.exports = app;
