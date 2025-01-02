const Service = require('./Service');
const { Bebida, Pessoa, Pedido } = require('../database/models');

class PedidoService extends Service {
  constructor() {
    super("Pedido");
  }

  async getListagemPedido(page = 1, limit = 12, filters = {}, include = []) {
    try {
      const offset = (page - 1) * limit;
      const options = {
        attributes: ['id', 'bebida_id', 'cliente_id', 'unitario', 'total', 'data_compra', 'quantidade'],
        include,
        where: filters,
        limit,
        offset,
        order: [['id', 'DESC']]
      };

      const allItems = await this.getAll(filters, null, options);
      const count = await Pedido.count({
        where: filters,
        include
      });

      const transformedItems = allItems.map(item => {
        const plainItem = item.get({ plain: true });
        return {
          id: plainItem.id,
          bebida: plainItem.bebida.nome,    // Alterado para usar o alias correto
          cliente: plainItem.cliente.nome,   // Alterado para usar o alias correto
          unitario: plainItem.unitario,
          total: plainItem.total,
          data_compra: plainItem.data_compra,
          quantidade: plainItem.quantidade
        };
      });

      return {
        items: transformedItems,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        itemsPerPage: limit
      }
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
}

module.exports = PedidoService;