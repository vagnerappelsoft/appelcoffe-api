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
            
            const filters = {};
            const include = [
                {
                    model: Bebida,
                    as: 'bebida',
                    attributes: ['nome'],
                    required: false
                },
                {
                    model: Pessoa,
                    as: 'cliente',
                    attributes: ['nome'],
                    required: false
                }
            ];
            
            if (id) {
                filters.id = { [Op.like]: `%${id}%` };
            }
            
            if (cliente) {
                include[1].required = true;
                include[1].where = {
                    nome: { [Op.like]: `%${cliente}%` }
                };
            }
            
            if (bebida) {
                include[0].required = true;
                include[0].where = {
                    nome: { [Op.like]: `%${bebida}%` }
                };
            }
            
            if (dataInicio && dataFim) {
                try {
                    const inicio = new Date(dataInicio);
                    const fim = new Date(dataFim);
                    if (!isNaN(inicio.getTime()) && !isNaN(fim.getTime())) {
                        filters.data_compra = {
                            [Op.between]: [inicio, fim]
                        };
                    }
                } catch (error) {
                    console.error('Erro ao processar datas:', error);
                }
            }

            console.log('Filtros:', { filters, include });
            
            const data = await this.service.getListagemPedido(
                parseInt(page),
                parseInt(limit),
                filters,
                include
            );
            
            return res.status(200).json(data);
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            return res.status(500).json({ 
                error: 'Erro ao processar a requisição',
                details: error.message 
            });
        }
    }

   async listarIdPedido(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.getidPedido({id});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async modificarPedido(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.putPedido(id, req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async criarPedido(req, res) {
        try {
            const data = await this.service.createPedido(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getClientStats(req, res) {
        try {
            const { mes, ano } = req.query;
            
            if (!mes || !ano) {
                const today = new Date();
                const currentMonth = today.getMonth() + 1;
                const currentYear = today.getFullYear();
                
                const data = await pedidoService.getClientStats(currentMonth, currentYear);
                return res.status(200).json(data);
            }

            const data = await pedidoService.getClientStats(parseInt(mes), parseInt(ano));
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error in getClientStats:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    async listarPedidos6Meses(req, res) {
        try {
            const data = await pedidoService.pedidosTotalPorMes();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error in listarPedidos6Meses:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PedidoController;
