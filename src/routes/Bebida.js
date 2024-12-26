const BebidaController = require('../controller/BebidaController')
const express = require('express')

const bebidaController = new BebidaController
const route = express.Router()

route.get('/bebida', (req, res) => bebidaController.ListarData(req, res))
route.get('/bebida/:id', (req, res) => bebidaController.ListarId(req, res))
route.put('/bebida/:id', (req, res) => bebidaController.ModificarData(req, res))
route.post('/bebida', (req, res) => bebidaController.CriarData(req, res))
route.delete('/bebida/:id', (req, res) => bebidaController.DeletarData(req, res))

module.exports = route
