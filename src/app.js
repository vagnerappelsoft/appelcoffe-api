const express = require('express');
const cors = require('cors');
const routes = require('./routes/app');
const path = require('path');

// Importa o job de limpeza de imagens temporárias
require('./jobs/cleanupTempImages');

const app = express();

// Middleware de CORS
app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de JSON para parsear o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registra todas as rotas
routes(app);

module.exports = app;
