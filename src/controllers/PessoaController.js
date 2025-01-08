const Controller = require("./Controller");
const PessoaService = require("../service/PessoaService");
const { Op } = require('sequelize');
const { Setor } = require('../database/models');
const imageController = require('./imageController');
const path = require('path');
const fs = require('fs').promises;

const pessoaService = new PessoaService();

class PessoaController extends Controller {
    constructor() {
        super(pessoaService);
    }

    async createPessoa(req, res) {
        try {
            const { tempFileName, ...data } = req.body;
            console.log('tempFileName recebido:', tempFileName);
            console.log('data recebido:', data);

            // Se tiver uma imagem temporária, move ela para a pasta definitiva
            if (tempFileName) {
                console.log('Tentando mover imagem temporária...');
                const imagePath = await imageController.moveImageFromTemp(tempFileName, 'pessoas');
                console.log('imagePath retornado:', imagePath);
                if (imagePath) {
                    data.imagem = imagePath;
                    console.log('data após adicionar imagem:', data);
                }
            }

            const result = await this.service.createData(data);
            return res.status(201).json(result);
        } catch (error) {
            console.error('Erro ao criar pessoa:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    async updatePessoa(req, res) {
        try {
            const { id } = req.params;
            const { tempFileName, ...data } = req.body;

            // Busca o registro atual para pegar a imagem antiga
            const currentRecord = await this.service.getById(id);
            
            // Se tiver uma imagem temporária, move ela para a pasta definitiva
            if (tempFileName) {
                const imagePath = await imageController.moveImageFromTemp(tempFileName, 'pessoas');
                if (imagePath) {
                    // Se tem imagem antiga, deleta ela
                    if (currentRecord.imagem) {
                        const oldImagePath = path.join(__dirname, '..', currentRecord.imagem);
                        try {
                            await fs.unlink(oldImagePath);
                        } catch (error) {
                            console.error('Erro ao deletar imagem antiga:', error);
                        }
                    }
                    data.imagem = imagePath;
                }
            }

            const [updatedCount] = await this.service.putData({ id: id }, data);
            if (updatedCount === 0) {
                return res.status(404).json({ error: 'Registro não encontrado ou nenhuma alteração feita' });
            }
            
            // Buscar o registro atualizado
            const updatedRecord = await this.service.getById(id);
            return res.status(200).json(updatedRecord);
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
            return res.status(500).json({ error: error.message });
        }
    }
    

    async listarIdPessoa(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.getByIdPessoa({ id });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }




    async listarTodosPessoas(req, res) {
        try {
            const data = await this.service.getTodasPessoascomSetor();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarDadosFiltradosPessoas(req, res) {
        try {
            const { 
                page = 1, 
                limit = 12, 
                nome,
                setor,
                status,
                id
            } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            const include = [{
                model: Setor,
                as: 'Setor',
                attributes: ['nome'],
                required: true
            }];

            if (id) filters.id = { [Op.like]: `%${id}%` };
            if (status) filters.status = status;
            if (nome) filters.nome = { [Op.like]: `%${nome}%` };
            if (setor) {
                include[0].where = {
                    nome: { [Op.like]: `%${setor}%` }
                };
            }

            const data = await this.service.getListagemPessoa(
                parseInt(page),
                parseInt(limit),
                filters,
                include
            );
            
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PessoaController;
