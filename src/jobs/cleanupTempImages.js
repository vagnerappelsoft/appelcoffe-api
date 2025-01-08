const imageController = require('../controllers/imageController');

// Executa a limpeza a cada hora
setInterval(async () => {
    console.log('Iniciando limpeza de imagens temporárias...');
    await imageController.cleanupTempImages();
}, 60 * 60 * 1000); // 1 hora em milissegundos

// Executa uma limpeza inicial quando o servidor iniciar
imageController.cleanupTempImages();
