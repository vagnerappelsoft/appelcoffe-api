const Service = require('./Service');

class PedidoService extends Service {
  constructor() {
    super("pedidos");
  }
}

module.exports = PedidoService;