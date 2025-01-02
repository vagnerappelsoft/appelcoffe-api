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
            const { page = 1, limit = 12, id, nome, preco, status } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            if (id) filters.id = { [Op.like]: `%${id}%` };
            if (nome) filters.nome = { [Op.like]: `%${nome}%` };
            if (status) filters.status = { [Op.like]: `%${status}%` };

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