const SetorController = require('../controller/SetorController')
const express = require('express')

const setorController = new SetorController
const route = express.Router()

route.get('/setor', (req, res) => setorController.ListarData(req, res))
route.get('/setor/:id', (req, res) => setorController.ListarId(req, res))
route.put('/setor', (req, res) => setorController.ModificarData(req, res))
route.post('/setor/:id', (req, res) => setorController.CriarData(req, res))
route.delete('/setor/:id', (req, res) => setorController.DeletarData(req, res))

module.exports = route
