const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { Pessoa, Bebida } = require('../database/models');

class ImageController {
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      }

      const { type, id } = req.params; // type pode ser 'pessoa' ou 'bebida'

      // Processa a imagem com sharp
      const processedImage = await sharp(req.file.buffer)
        .resize(800, 800, { fit: 'inside' })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Cria um nome único para o arquivo
      const fileName = `${type}_${uuidv4()}.jpg`;
      
      // Define o diretório de uploads específico para o tipo
      const uploadDir = path.join(__dirname, '..', 'uploads', type);
      await fs.mkdir(uploadDir, { recursive: true });

      // Salva a imagem processada
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, processedImage);

      // Caminho relativo para salvar no banco de dados
      const imageUrl = `/uploads/${type}/${fileName}`;

      // Atualiza o registro no banco de dados
      if (type === 'pessoas') {
        const pessoa = await Pessoa.findByPk(id);
        if (!pessoa) {
          return res.status(404).json({ error: 'Pessoa não encontrada' });
        }
        await pessoa.update({ foto: imageUrl });
      } else if (type === 'bebidas') {
        const bebida = await Bebida.findByPk(id);
        if (!bebida) {
          return res.status(404).json({ error: 'Bebida não encontrada' });
        }
        await bebida.update({ imagem: imageUrl });
      } else {
        return res.status(400).json({ error: 'Tipo inválido' });
      }
      
      return res.json({
        success: true,
        imageUrl,
        message: 'Imagem enviada com sucesso'
      });

    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      return res.status(500).json({
        error: 'Erro ao processar o upload da imagem',
        details: error.message
      });
    }
  }

  async deleteImage(req, res) {
    try {
      const { type, id } = req.params;

      let model;
      let imageField;

      if (type === 'pessoa') {
        model = Pessoa;
        imageField = 'foto';
      } else if (type === 'bebida') {
        model = Bebida;
        imageField = 'imagem';
      } else {
        return res.status(400).json({ error: 'Tipo inválido' });
      }

      const record = await model.findByPk(id);
      if (!record) {
        return res.status(404).json({ error: `${type} não encontrado(a)` });
      }

      // Se houver uma imagem antiga, deleta ela
      if (record[imageField]) {
        const oldImagePath = path.join(__dirname, '..', record[imageField]);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error('Erro ao deletar imagem antiga:', error);
        }
      }

      // Atualiza o registro para remover a referência da imagem
      await record.update({ [imageField]: null });

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
}

module.exports = new ImageController();
