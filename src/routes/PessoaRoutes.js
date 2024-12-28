const PessoaController = require('../controller/PessoaController')
/**
 * Express module for creating the router.
 */
const express = require('express')

const pessoaController = new PessoaController()
const route = express.Router()

route.get('/pessoas', (req, res) => pessoaController.ListarData(req, res))
route.get('/pessoas/listagem', (req, res) => pessoaController.listarDadosFiltradosPessoas(req, res))
route.get('/pessoas/:id', (req, res) => pessoaController.ListarId(req, res))
route.put('/pessoas/:id', (req, res) => pessoaController.ModificarData(req, res))
route.post('/pessoas', (req, res) => pessoaController.CriarData(req, res))
route.delete('/pessoas/:id', (req, res) => pessoaController.DeletarData(req, res))

module.exports = route