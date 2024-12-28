const express = require('express');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send('API em execução');
    });
    
    app.use(
        express.json(),
        require('./SetorRoutes'),
        require('./PedidoRoutes'),
        require('./PessoaRoutes'),
        require('./BebidaRoutes')
    );
}    

module.exports = routes;
