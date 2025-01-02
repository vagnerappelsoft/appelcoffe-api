const express = require('express');
const authController = require('../controllers/authController');
const route = express.Router();

route.post('/auth/login', (req, res) => authController.login(req, res));

module.exports = route;