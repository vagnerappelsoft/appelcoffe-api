const express = require('express');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send('API em execução');
    });
    
    app.use(
        express.json(),
        require('./Setor'),
        require('./Pedido'),
        require('./Pessoa'),
        require('./Bebida')
    );
}    

module.exports = routes;
