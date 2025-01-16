const express = require('express');
const DiscordController = require('../controllers/DiscordController');
const uploadImage = require('../utils/uploadImage');
const router = express.Router();






/**
 * @swagger
 * /enviarDiscord:
 *   post:
 *     summary: Envia um relatório CSV e conteúdo para o Discord
 *     tags: [Discord]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo CSV do relatório
 *               content:
 *                 type: string
 *                 description: Texto adicional para o Discord
 *     responses:
 *       200:
 *         description: Relatório enviado com sucesso
 *       400:
 *         description: Nenhum arquivo foi enviado
 *       500:
 *         description: Erro ao enviar relatório
 */
router.post('/enviarDiscord', uploadImage.single('file'), (req, res) => DiscordController.enviarRelatorioDiscord(req, res));

module.exports = router;