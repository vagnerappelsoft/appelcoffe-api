const Controller = require("./Controller");
const PessoaService = require("../service/PessoaService");
const { Op } = require('sequelize');

const pessoaService = new PessoaService();

class PessoaController extends Controller {
    constructor() {
        super(pessoaService);
    }

    async listarDadosFiltradosPessoas(req, res) {
        try {
            const { 
                page = 1, 
                limit = 12, 
                nome,
                setor_id
            } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            
            if (nome) filters.nome = { [Op.like]: `%${nome}%` };
            if (setor_id) filters.setor_id = setor_id;

            const data = await this.service.getListagemPessoa(
                parseInt(page),
                parseInt(limit),
                filters
            );
            
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PessoaController;
