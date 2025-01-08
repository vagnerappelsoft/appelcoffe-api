const PessoaController = require('../controllers/PessoaController')
/**
 * Express module for creating the router.
 */
const express = require('express')

const pessoaController = new PessoaController()
const route = express.Router()




/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Lista todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso
 */

route.get('/pessoas', (req, res) => pessoaController.listarTodosPessoas(req, res))
/**
 * 
 * @swagger
 * /pessoas/listagem:
 *   get:
 *     summary: Lista pessoas com filtros
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista filtrada de pessoas
 */
route.get('/pessoas/listagem', (req, res) => pessoaController.listarDadosFiltradosPessoas(req, res))

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Obtém uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       404:
 *         description: Pessoa não encontrada
 */
route.get('/pessoas/:id', (req, res) => pessoaController.listarIdPessoa(req, res))

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               setorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
route.put('/pessoas/:id', (req, res) => pessoaController.updatePessoa(req, res))

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               setorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 */
route.post('/pessoas', (req, res) => pessoaController.createPessoa(req, res))

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Remove uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa removida com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
route.delete('/pessoas/:id', (req, res) => pessoaController.DeletarData(req, res))


/**
 * @swagger
 * /pessoas/{id}/restore:
 *   patch:
 *     summary: Restaura uma pessoa  
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa restaurada com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
route.patch('/pessoas/:id/restore', (req, res) => pessoaController.restaurarData(req, res))

module.exports = route