const BebidaController = require('../controller/BebidaController')
const express = require('express')

const bebidaController = new BebidaController()
const route = express.Router()

route.get('/bebidas', (req, res) => bebidaController.ListarData(req, res))
route.get('/bebidas/listagem', (req, res) => bebidaController.listarDadosFiltradosBebidas(req, res))
route.get('/bebidas/:id', (req, res) => bebidaController.ListarId(req, res))
route.put('/bebidas/:id', (req, res) => bebidaController.ModificarData(req, res))
route.post('/bebidas', (req, res) => bebidaController.CriarData(req, res))
route.delete('/bebidas/:id', (req, res) => bebidaController.DeletarData(req, res))

module.exports = route
