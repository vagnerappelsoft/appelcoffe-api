const Service = require('./Service');
const { Bebida, Pessoa, Pedido } = require('../database/models');
const { Op, sequelize: dataSource } = require('sequelize');

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

  async getidPedido(id) {
    try {
      const pedido = await Pedido.findByPk(id, {
        include: [
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
        ]
      });

      if (!pedido) {
        return null;
      }

      return {
        id: pedido.id,
        bebida: pedido.bebida.nome,    // Alterado para usar o alias correto
        cliente: pedido.cliente.nome,   // Alterado para usar o alias correto
        unitario: pedido.unitario,
        total: pedido.total,
        data_compra: pedido.data_compra,
        quantidade: pedido.quantidade
      };
    } catch (error) {
      throw new Error(`Error fetching data for ${this.model}: ${error.message}`);
    }
  }

  async getClientStats(month, year) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const results = await dataSource.Pedido.findAll({
        attributes: [
          [dataSource.sequelize.fn('DATE_FORMAT', dataSource.sequelize.col('data_compra'), '%m/%Y'), 'mesAno'],
          [dataSource.sequelize.col('cliente.nome'), 'cliente'],
          [dataSource.sequelize.fn('COUNT', dataSource.sequelize.col('Pedido.id')), 'vezesComprou'],
          [dataSource.sequelize.fn('SUM', dataSource.sequelize.col('total')), 'valorTotal']
        ],
        include: [{
          model: dataSource.Pessoa,
          as: 'cliente',
          attributes: []
        }],
        where: {
          data_compra: {
            [Op.between]: [startDate, endDate]
          }
        },
        group: ['cliente.id', 'cliente.nome', dataSource.sequelize.fn('DATE_FORMAT', dataSource.sequelize.col('data_compra'), '%m/%Y')],
        raw: true
      });

      return results.map(result => ({
        ...result,
        vezesComprou: Number(result.vezesComprou),
        valorTotal: Number(result.valorTotal)
      }));
    } catch (error) {
      throw new Error(`Error getting client statistics: ${error.message}`);
    }
  }
}

module.exports = PedidoService;