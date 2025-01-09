const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { Pessoa, Bebida } = require('../database/models');

class ImageController {
  async uploadCadastroImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      }

      const { tipo } = req.params;

      const validTipos = ['pessoas', 'bebidas'];
      
      if (!validTipos.includes(tipo)) {
        return res.status(400).json({ error: 'Tipo de cadastro inválido' });
      }

      // Processa a imagem com sharp
      const processedImage = await sharp(req.file.buffer)
        .resize(800, 800, { fit: 'inside' })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Cria um nome único para o arquivo temporário
      const tempFileName = `temp_${uuidv4()}.jpg`;
      
      // Define o diretório temporário específico para o tipo
      const tempDir = path.join('uploads', 'temp', tipo);
      console.log('Temporary directory path:', tempDir);
      
      await fs.mkdir(tempDir, { recursive: true });

      // Salva a imagem processada no diretório temporário
      const tempFilePath = path.join(tempDir, tempFileName);
      console.log('Saving image to:', tempFilePath);
      await fs.writeFile(tempFilePath, processedImage);

      // Verifica se o arquivo foi criado corretamente
      try {
        const fileExists = await fs.access(tempFilePath).then(() => true).catch(() => false);
        console.log('File exists:', fileExists);
        const stats = await fs.stat(tempFilePath);
        console.log('File size:', stats.size, 'bytes');
      } catch (error) {
        console.error('Error checking file:', error);
      }

      // Retorna o caminho temporário da imagem para preview
      const previewUrl = `/api/images/temp/${tipo}/${tempFileName}`;
      console.log('Preview URL:', previewUrl); // Para debug

      return res.status(200).json({
        message: 'Imagem enviada com sucesso',
        previewUrl,
        tempFileName
      });
    } catch (error) {
      console.error('Erro no upload de imagem:', error);
      return res.status(500).json({ error: 'Erro ao processar o upload da imagem' });
    }
  }

  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      }

      const { tipo, id } = req.params;

      // Validar o tipo
      const validTipos = ['pessoas', 'bebidas'];
      if (!validTipos.includes(tipo)) {
        return res.status(400).json({ error: 'Tipo inválido' });
      }

      // Processa a imagem com sharp
      const processedImage = await sharp(req.file.buffer)
        .resize(800, 800, { fit: 'inside' })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Cria um nome único para o arquivo temporário
      const tempFileName = `temp_${uuidv4()}.jpg`;
      
      // Define o diretório temporário
      const tempDir = path.join('uploads', 'temp', tipo);
      await fs.mkdir(tempDir, { recursive: true });

      // Salva a imagem processada no diretório temporário
      const tempFilePath = path.join(tempDir, tempFileName);
      await fs.writeFile(tempFilePath, processedImage);

      // Verifica se o arquivo foi criado corretamente
      try {
        const fileExists = await fs.access(tempFilePath).then(() => true).catch(() => false);
        console.log('File exists:', fileExists);
        const stats = await fs.stat(tempFilePath);
        console.log('File size:', stats.size, 'bytes');
      } catch (error) {
        console.error('Error checking file:', error);
      }

      // Retorna o caminho temporário da imagem para preview
      const previewUrl = `/api/images/temp/${tipo}/${tempFileName}`;

      // Busca o registro para verificar se existe
      let model;
      switch (tipo) {
        case 'pessoas':
          model = Pessoa;
          break;
        case 'bebidas':
          model = Bebida;
          break;
      }

      const record = await model.findByPk(id);
      if (!record) {
        // Se o registro não existe, remove o arquivo temporário
        await fs.unlink(tempFilePath);
        return res.status(404).json({ error: `${tipo} não encontrado` });
      }

      return res.status(200).json({
        message: 'Imagem enviada com sucesso',
        previewUrl,
        tempFileName,
        currentImage: record.imagem // Retorna a imagem atual também
      });
    } catch (error) {
      console.error('Erro no upload de imagem:', error);
      return res.status(500).json({ error: 'Erro ao processar o upload da imagem', details: error.message });
    }
  }

  async deleteImage(req, res) {
    try {
      const { tipo, id } = req.params;

      let model;

      if (tipo === 'pessoas') {
        model = Pessoa;
      } else if (tipo === 'bebidas') {
        model = Bebida;
      } else {
        return res.status(400).json({ error: 'Tipo inválido' });
      }

      const record = await model.findByPk(id);
      if (!record) {
        return res.status(404).json({ error: `${tipo} não encontrado(a)` });
      }

      // Se houver uma imagem antiga, deleta ela
      if (record.imagem) {
        const oldImagePath = path.join('uploads', record.imagem);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error('Erro ao deletar imagem antiga:', error);
        }
      }

      // Atualiza o registro para remover a referência da imagem
      await record.update({ imagem: null });

      return res.json({
        success: true,
        message: 'Imagem removida com sucesso'
      });

    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      return res.status(500).json({
        error: 'Erro ao deletar imagem',
        details: error.message
      });
    }
  }

  // Método utilitário para mover imagem da pasta temp para definitiva
  async moveImageFromTemp(tempFileName, tipo) {
    if (!tempFileName) return null;

    try {
      // Caminho do arquivo temporário
      const tempPath = path.join('uploads', 'temp', tipo, tempFileName);
      console.log('Caminho temporário:', tempPath);

      // Verifica se o arquivo existe
      try {
        await fs.access(tempPath);
        console.log('Arquivo temporário encontrado');
      } catch (error) {
        console.error('Arquivo temporário não encontrado:', tempFileName);
        return null;
      }

      // Cria um novo nome para o arquivo definitivo
      const finalFileName = `${tipo}_${uuidv4()}.jpg`;
      console.log('Nome do arquivo final:', finalFileName);
      
      // Define o diretório definitivo
      const uploadDir = path.join('uploads', tipo);
      console.log('Diretório de upload:', uploadDir);
      await fs.mkdir(uploadDir, { recursive: true });

      // Caminho definitivo do arquivo
      const finalPath = path.join(uploadDir, finalFileName);
      console.log('Caminho final:', finalPath);

      // Move o arquivo
      await fs.rename(tempPath, finalPath);
      console.log('Arquivo movido com sucesso');

      // Retorna o caminho relativo para salvar no banco
      const relativePath = path.join('uploads', tipo, finalFileName).replace(/\\/g, '/');
      console.log('Caminho relativo retornado:', relativePath);
      return relativePath;
    } catch (error) {
      console.error('Erro ao mover imagem:', error);
      return null;
    }
  }

  // Método para limpar imagens temporárias antigas
  async cleanupTempImages() {
    try {
      const tempDir = path.join('uploads', 'temp');
      const dirs = await fs.readdir(tempDir);
      
      for (const dir of dirs) {
        const dirPath = path.join(tempDir, dir);
        const files = await fs.readdir(dirPath);
        
        const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hora em milissegundos

        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const stats = await fs.stat(filePath);
          
          // Remove arquivos temporários com mais de 1 hora
          if (stats.mtimeMs < oneHourAgo) {
            try {
              await fs.unlink(filePath);
              console.log('Arquivo temporário removido:', file);
            } catch (error) {
              console.error('Erro ao remover arquivo temporário:', file, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro ao limpar arquivos temporários:', error);
    }
  }
}

module.exports = new ImageController();
