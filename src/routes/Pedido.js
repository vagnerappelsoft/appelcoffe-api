const PedidoController = require('../controller/PedidoController')
const express = require('express')

const pedidoController = new PedidoController()
const route = express.Router()

route.get('/pedido', (req, res) => pedidoController.ListarData(req, res))
route.get('/pedido/:id', (req, res) => pedidoController.ListarId(req, res))
route.put('/pedido/:id', (req, res) => pedidoController.ModificarData(req, res))
route.post('/pedido', (req, res) => pedidoController.CriarData(req, res))
route.delete('/pedido/:id', (req, res) => pedidoController.DeletarData(req, res))

module.exports = route
