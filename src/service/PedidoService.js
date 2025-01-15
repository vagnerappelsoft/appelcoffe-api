const Service = require('./Service');
const { Bebida, Pessoa, Pedido, sequelize } = require('../database/models');
const { Op, Sequelize } = require('sequelize');

class PedidoService extends Service {
  constructor() {
    super("Pedido");
  }

  async getListagemPedido(page = 1, limit = 12, filters = {}, include = []) {
    try {
      const offset = (page - 1) * limit;

      const allItems = await this.getAll(filters, null, {
        attributes: ['id', 'bebida_id', 'cliente_id', 'unitario', 'total', 'data_compra', 'quantidade'],
        include: include,
        limit,
        offset,
        order: [['id', 'DESC']]
      });

      const count = await Pedido.count({
        where: filters,
        include: include.filter(inc => inc.required)
      });

      const transformedItems = allItems.map(item => {
        const plainItem = item.get({ plain: true });
        return {
          id: plainItem.id,
          bebida: plainItem.bebida?.nome || '',
          cliente: plainItem.cliente?.nome || '',
          unitario: plainItem.unitario,
          total: plainItem.total,
          data_compra: plainItem.data_compra,
          quantidade: plainItem.quantidade
        };
      });

      return {
        items: transformedItems,
        totalItems: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        itemsPerPage: parseInt(limit)
      };
    } catch (error) {
      throw new Error(`Error fetching paginated data for ${this.model}: ${error.message}`);
    }
  }

  async getidPedido(params) {
    try {
      const pedido = await Pedido.findOne({
        where: { id: params.id },
        include: [
          {
            model: Bebida,
            as: 'bebida',  // Adicionando o alias 'bebida'
            attributes: ['id', 'nome'],
            required: true
          },
          {
            model: Pessoa,
            as: 'cliente', // Adicionando o alias 'cliente'
            attributes: ['id', 'nome'],
            required: true
          }
        ]
      });

      if (!pedido) {
        return null;
      }

      const plainPedido = pedido.get({ plain: true });
      
      const pedidoData = {
        id: plainPedido.id,
        bebida: {
          id: plainPedido.bebida.id,
          nome: plainPedido.bebida.nome
        },
        cliente: {
          id: plainPedido.cliente.id,
          nome: plainPedido.cliente.nome
        },
        unitario: plainPedido.unitario,
        total: plainPedido.total,
        data_compra: plainPedido.data_compra,
        quantidade: plainPedido.quantidade
      };

      return pedidoData;

    } catch (error) {
      throw new Error(`Error fetching data for ${this.model}: ${error.message}`);
    }
  }

  async putPedido(id, data) {
    try {

      const updateData = {
        ...data,
        bebida_id: data.bebida?.id || data.bebida_id,
        cliente_id: data.cliente?.id || data.cliente_id
      };

      delete updateData.bebida;
      delete updateData.cliente;

      await Pedido.update(updateData, {
        where: { id }
      });

      return this.getidPedido({ id });
      
    } catch (error) {
      throw new Error(`Error updating data for ${this.model}: ${error.message}`);
    }
  }

  

  async createPedido(data) {
    try {

      const updateData = {
        ...data,
        bebida_id: data.bebida?.id || data.bebida_id,
        cliente_id: data.cliente?.id || data.cliente_id
      };

      delete updateData.bebida;
      delete updateData.cliente;


      const novoPedido = await Pedido.create(updateData);
      return this.getidPedido({ id: novoPedido.id });
    } catch (error) {
      throw new Error(`Error creating data for ${this.model}: ${error.message}`);
    }
  }


  async getClientStats(mes, ano) {
    try {
      const startDate = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0));
      
      const endDate = new Date(Date.UTC(ano, mes, 0, 23, 59, 59, 999));

      const results = await Pedido.findAll({
        attributes: [
          'cliente_id',
          [Sequelize.fn('SUM', Sequelize.col('Pedido.quantidade')), 'vezesComprou'],
          [Sequelize.fn('SUM', Sequelize.col('Pedido.total')), 'valorTotal']
        ],
        include: [{
          model: Pessoa,
          as: 'cliente',
          attributes: ['nome']
        }],
        where: {
          data_compra: {
            [Op.between]: [startDate, endDate]
          }
        },
        group: ['cliente_id', 'cliente.id', 'cliente.nome'],
        raw: true
      });

      return results.map(result => ({
        mesAno: `${mes.toString().padStart(2, '0')}/${ano}`,
        cliente: result['cliente.nome'],
        vezesComprou: Number(result.vezesComprou),
        valorTotal: Number(result.valorTotal)
      }));
    } catch (error) {
      console.error('Error in getClientStats:', error);
      throw new Error(`Error getting client statistics: ${error.message}`);
    }
  }


  async pedidosTotalPorMes() {
    try {

      const hoje = new Date();
      const seisMesesAtras = new Date(hoje.getFullYear(), hoje.getMonth() - 5, 1);

      const results = await Pedido.findAll({
        attributes: [
          [Sequelize.literal('DATE_FORMAT(data_compra, "%Y-%m-01")'), 'mes'],
          [Sequelize.fn('SUM', Sequelize.col('quantidade')), 'totalVendas']
        ],
        where: {
          data_compra: {
            [Op.gte]: seisMesesAtras,
            [Op.lte]: hoje
          }
        },
        group: [Sequelize.literal('DATE_FORMAT(data_compra, "%Y-%m-01")')],
        having: Sequelize.literal('totalVendas > 0'),
        order: [Sequelize.literal('mes ASC')],
        raw: true
      });

      return results.map(result => ({
        mesAno: `${result.mes.split('-')[0]}-${result.mes.split('-')[1]}`,
        totalVendas: parseInt(result.totalVendas)
      }));

    } catch (error) {
      console.error('Error in pedidosTotalPorMes:', error);
      throw new Error(`Error getting total sales by month: ${error.message}`);
    }
  }
}

module.exports = PedidoService;