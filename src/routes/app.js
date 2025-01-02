const express = require('express');
const path = require('path');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send('API em execução');
    });
    
    app.use(
        express.json(),
        require('./imageRoutes'),
        require('./SetorRoutes'),
        require('./PedidoRoutes'),
        require('./PessoaRoutes'),
        require('./BebidaRoutes'),
        require('./authRoutes')
    );
}    

module.exports = routes;
