const { Router } = require('express');
const upload = require('../middlewares/uploadConfig');
const imageController = require('../controllers/imageController');

const router = Router();

/**
 * @swagger
 * /{type}/{id}/upload:
 *   post:
 *     summary: Faz upload de uma imagem para pessoa ou bebida
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pessoa, bebida]
 *         description: Tipo do objeto (pessoa ou bebida)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objeto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem enviada com sucesso
 *       400:
 *         description: Erro ao enviar imagem
 */
router.post('/:type/:id/upload', upload.single('foto'), imageController.uploadImage);

/**
 * @swagger
 * /{type}/{id}:
 *   delete:
 *     summary: Remove uma imagem
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pessoa, bebida]
 *         description: Tipo do objeto (pessoa ou bebida)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objeto
 *     responses:
 *       200:
 *         description: Imagem removida com sucesso
 *       404:
 *         description: Imagem não encontrada
 */
router.delete('/:type/:id', imageController.deleteImage);

module.exports = router;
