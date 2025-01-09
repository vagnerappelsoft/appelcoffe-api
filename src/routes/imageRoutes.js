const { Router } = require('express');
const upload = require('../middlewares/uploadConfig');
const imageController = require('../controllers/imageController');
const path = require('path');
const fs = require('fs');

const router = Router();

/**
 * @swagger
 * /{tipo}/{id}/upload:
 *   post:
 *     summary: Faz upload de uma imagem para pessoa ou bebida
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           tipo: string
 *           enum: [pessoas, bebidas]
 *         description: Tipo do objeto (pessoa, bebida)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           tipo: integer
 *         description: ID do objeto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             tipo: object
 *             properties:
 *               imagem:
 *                 tipo: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem enviada com sucesso
 *       400:
 *         description: Erro ao enviar imagem
 */
// Rota para upload de imagem
router.post('/:tipo/:id/upload', upload.single('imagem'), imageController.uploadImage);

/**
 * @swagger
 * /{tipo}/{id}/deleteImage:
 *   delete:
 *     summary: Remove uma imagem
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           tipo: string
 *           enum: [pessoas, bebidas]
 *         description: Tipo do objeto (pessoa ou bebida)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           tipo: integer
 *         description: ID do objeto
 *     responses:
 *       200:
 *         description: Imagem removida com sucesso
 *       404:
 *         description: Imagem não encontrada
 */
// Rota para deletar imagem
router.delete('/:tipo/:id/deleteImage', imageController.deleteImage);

/**
 * @swagger
 * /{tipo}/upload-cadastro:
 *   post:
 *     summary: Faz upload de uma imagem durante o cadastro
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           tipo: string
 *           enum: [pessoas, bebidas]
 *         description: Tipo do cadastro (pessoa, bebida )
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             tipo: object
 *             properties:
 *               image:
 *                 tipo: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem enviada com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:tipo/upload-cadastro', upload.single('imagem'), imageController.uploadCadastroImage);

// Rota para servir imagens temporárias
router.get('/temp/:tipo/:filename', async (req, res) => {
    const { tipo, filename } = req.params;
    const imagePath = path.join('uploads', 'temp', tipo, filename);
    console.log('Tentando acessar imagem em:', imagePath);
    
    try {
        // Verifica se o arquivo existe
        await fs.access(imagePath);
        console.log('Arquivo encontrado');
        
        // Define o tipo de conteúdo
        res.setHeader('Content-Type', 'image/jpeg');
        
        // Lê e envia o arquivo
        const fileStream = fs.createReadStream(imagePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Erro ao servir imagem:', error);
        res.status(404).send('Imagem não encontrada');
    }
});

module.exports = router;
