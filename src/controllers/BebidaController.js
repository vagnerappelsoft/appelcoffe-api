const Controller = require('./Controller');
const BebidaService = require('../service/BebidaService');
const { Op } = require('sequelize'); // Add this line to import Op from sequelize

const bebidaService = new BebidaService();

class BebidaController extends Controller{
    constructor(){
        super(bebidaService);
    }

    async listarDadosFiltradosBebidas(req, res){
        try{
            const { page = 1, limit = 12, nome, preco, status } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            if (nome) filters.nome = { [Op.like]: `%${nome}%` };
            if (preco) filters.preco = preco;
            if (status) filters.status = status;

            const data = await this.service.getListagemBebida(
                parseInt(page),
                parseInt(limit),
                filters
            );
            
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = BebidaController;