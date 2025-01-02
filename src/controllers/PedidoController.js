const Controller = require("./Controller");
const PedidoService = require("../service/PedidoService");
const { Op } = require('sequelize');
const { Bebida, Pessoa } = require('../database/models');

const pedidoService = new PedidoService();

class PedidoController extends Controller {
    constructor() {
        super(pedidoService);
    }

    async listarDadosFiltradosPedidos(req, res) {
        try {
            const { 
                page = 1, 
                limit = 12, 
                cliente,
                bebida,
                id,
                dataInicio,
                dataFim
            } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            const include = [
                {
                    model: Bebida,
                    as: 'bebida',  // Adicionando o alias 'bebida'
                    attributes: ['nome'],
                    required: true
                },
                {
                    model: Pessoa,
                    as: 'cliente', // Adicionando o alias 'cliente'
                    attributes: ['nome'],
                    required: true
                }
            ];
            
            if(id) filters.id = {[Op.like]: `%${id}%`};
            if (cliente) {
                include[1].where = {
                    nome: { [Op.like]: `%${cliente}%` }
                };
            }
            if (bebida) {
                include[0].where = {
                    nome: { [Op.like]: `%${bebida}%` }
                };
            }
            if (dataInicio && dataFim) {
                filters.data_compra = {
                    [Op.between]: [new Date(dataInicio), new Date(dataFim)]
                };
            }
            
            const data = await this.service.getListagemPedido(
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

   async listarIdPedido(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.getidPedido(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PedidoController;
