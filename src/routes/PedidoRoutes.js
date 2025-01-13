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
 * /pedidos/relatorio :
 *   get:
 *     summary: Obtém estatísticas de compras dos clientes por mês
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: mes
 *         schema:
 *           type: integer
 *         description: Mês para filtrar (1-12). Se não fornecido, usa o mês atual
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Ano para filtrar. Se não fornecido, usa o ano atual
 *     responses:
 *       200:
 *         description: Estatísticas de compras dos clientes retornadas com sucesso
 */
route.get('/pedidos/relatorio', (req, res) => pedidoController.getClientStats(req, res))

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
route.put('/pedidos/:id', (req, res) => pedidoController.modificarPedido(req, res))

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
route.post('/pedidos', (req, res) => pedidoController.criarPedido(req, res))

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
