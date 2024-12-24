const Controller = require("./Controller");
const PedidoService = require("../service/PedidoService");

const pedidoService = new PedidoService();

class PedidoController extends Controller {
    constructor() {
        super(pedidoService);
    }

    
    }


module.exports = PedidoController;
