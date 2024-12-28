const Controller = require("./Controller");
const PedidoService = require("../service/PedidoService");
const { Op } = require('sequelize');

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
                clienteId,
                bebidaId,
                status,
                dataInicio,
                dataFim
            } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            
            if (clienteId) filters.clienteId = clienteId;
            if (bebidaId) filters.bebidaId = bebidaId;
            if (status) filters.status = status;
            
            // Filtro por data
            if (dataInicio || dataFim) {
                filters.createdAt = {};
                if (dataInicio) filters.createdAt[Op.gte] = new Date(dataInicio);
                if (dataFim) filters.createdAt[Op.lte] = new Date(dataFim);
            }

            const data = await this.service.getListagemPedido(
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

module.exports = PedidoController;
