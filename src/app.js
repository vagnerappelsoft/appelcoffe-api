const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// Use the router
app.use(routes);

module.exports = app;
