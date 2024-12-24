const PessoaController = require('../controller/PessoaController')
const express = require('express')

const pessoaController = new PessoaController
const route = express.Router()

route.get('/pessoa', (req, res) => pessoaController.ListarData(req, res))
route.get('/pessoa/:id', (req, res) => pessoaController.ListarId(req, res))
route.put('/pessoa', (req, res) => pessoaController.ModificarData(req, res))
route.post('/pessoa/:id', (req, res) => pessoaController.CriarData(req, res))
route.delete('/pessoa/:id', (req, res) => pessoaController.DeletarData(req, res))

module.exports = route