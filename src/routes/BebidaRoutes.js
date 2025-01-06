const BebidaController = require('../controllers/BebidaController')
const express = require('express')

const bebidaController = new BebidaController()
const route = express.Router()


/**
 * @swagger
 * /bebidas:
 *   get:
 *     summary: Lista bebidas 
 *     tags: [Bebidas]
 *     responses:
 *       200:
 *         description: Lista Bebidas
 */
route.get('/bebidas', (req, res) => bebidaController.ListarData(req, res))


/**
 * @swagger
 * /bebidas/listagem:
 *   get:
 *     summary: Lista bebidas com filtros
 *     tags: [Bebidas]
 *     responses:
 *       200:
 *         description: Lista filtrada de bebidas
 */
route.get('/bebidas/listagem', (req, res) => bebidaController.listarDadosFiltradosBebidas(req, res))

/**
 * @swagger
 * /bebidas/{id}:
 *   get:
 *     summary: Obtém uma bebida pelo ID
 *     tags: [Bebidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bebida encontrada
 *       404:
 *         description: Bebida não encontrada
 */
route.get('/bebidas/:id', (req, res) => bebidaController.ListarId(req, res))

/**
 * @swagger
 * /bebidas/{id}:
 *   put:
 *     summary: Atualiza uma bebida
 *     tags: [Bebidas]
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
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bebida atualizada com sucesso
 *       404:
 *         description: Bebida não encontrada
 */
route.put('/bebidas/:id', (req, res) => bebidaController.ModificarData(req, res))

/**
 * @swagger
 * /bebidas:
 *   post:
 *     summary: Cria uma nova bebida
 *     tags: [Bebidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Bebida criada com sucesso
 */
route.post('/bebidas', (req, res) => bebidaController.CriarData(req, res))

/**
 * @swagger
 * /bebidas/{id}:
 *   delete:
 *     summary: Remove uma bebida
 *     tags: [Bebidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bebida removida com sucesso
 *       404:
 *         description: Bebida não encontrada
 */
route.delete('/bebidas/:id', (req, res) => bebidaController.DeletarData(req, res))

module.exports = route
