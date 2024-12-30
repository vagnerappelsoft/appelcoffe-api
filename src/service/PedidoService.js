const Service = require('./Service');
const { Bebida, Pessoa } = require('../database/models');

class PedidoService extends Service {
  constructor() {
    super("Pedido");
  }

  async getListagemPedido(page = 1, limit = 12, filters = {}) {
    try {
      const options = {
        include: [
          {
            model: Bebida,
            as: 'bebida',
            attributes: ['id', 'nome', 'preco']
          },
          {
            model: Pessoa,
            as: 'cliente',
            attributes: ['id', 'nome']
          }
        ]
      };
      
      return await this.getPaginated(page, limit, filters, null, options);
    } catch (error) {
      throw new Error(`Error fetching paginated pedidos: ${error.message}`);
    }
  }

  
  async getAll(filters = {}) {
    try {
      return await super.getAll(filters, null, {
        include: [
          {
            model: Bebida,
            as: 'bebida',
            attributes: ['id', 'nome', 'preco']
          },
          {
            model: Pessoa,
            as: 'cliente',
            attributes: ['id', 'nome']
          }
        ]
      });
    } catch (error) {
      throw new Error(`Error fetching pedidos: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const options = {
        include: [
          {
            model: Bebida,
            as: 'bebida',
            attributes: ['id', 'nome', 'preco']
          },
          {
            model: Pessoa,
            as: 'cliente',
            attributes: ['id', 'nome']
          }
        ]
      };
      return await super.getById(id, options);
    } catch (error) {
      throw new Error(`Error fetching pedido by ID: ${error.message}`);
    }
  }
}

module.exports = PedidoService;