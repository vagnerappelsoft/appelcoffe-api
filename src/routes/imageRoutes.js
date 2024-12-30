const { Router } = require('express');
const upload = require('../middlewares/uploadConfig');
const imageController = require('../controllers/imageController');

const router = Router();

// Rota para upload de imagem (pessoa ou bebida)
router.post('/:type/:id/upload', upload.single('foto'), imageController.uploadImage);

// Rota para deletar imagem
router.delete('/:type/:id', imageController.deleteImage);

module.exports = router;
