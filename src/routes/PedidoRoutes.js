const PedidoController = require('../controllers/PedidoController')
const express = require('express')

const pedidoController = new PedidoController()
const route = express.Router()


/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */

route.get('/pedidos', (req, res) => pedidoController.ListarData(req, res))

/**
 * @swagger
 * /pedidos/listagem:
 *   get:
 *     summary: Lista pedidos com filtros
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista filtrada de pedidos
 */
route.get('/pedidos/listagem', (req, res) => pedidoController.listarDadosFiltradosPedidos(req, res))

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtém um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
route.get('/pedidos/:id', (req, res) => pedidoController.listarIdPedido(req, res))

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Pedidos]
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
 *               status:
 *                 type: string
 *               bebidaId:
 *                 type: integer
 *               pessoaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
route.put('/pedidos/:id', (req, res) => pedidoController.ModificarData(req, res))

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               bebidaId:
 *                 type: integer
 *               pessoaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
route.post('/pedidos', (req, res) => pedidoController.CriarData(req, res))

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
route.delete('/pedidos/:id', (req, res) => pedidoController.DeletarData(req, res))


/**
 * @swagger
 * /pedidos/{id}/restore:
 *   patch:
 *     summary: Restaura um pedido 
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido restaurado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
route.patch('/pedidos/:id/restore', (req, res) => pedidoController.restaurarData(req, res))

module.exports = route
