const SetorController = require('../controller/SetorController')
const express = require('express')

const setorController = new SetorController
const route = express.Router()

route.get('/setores', (req, res) => setorController.ListarData(req, res))
route.get('/setores/:id', (req, res) => setorController.ListarId(req, res))
route.put('/setores/:id', (req, res) => setorController.ModificarData(req, res))
route.post('/setores', (req, res) => setorController.CriarData(req, res))
route.delete('/setores/:id', (req, res) => setorController.DeletarData(req, res))

module.exports = route
