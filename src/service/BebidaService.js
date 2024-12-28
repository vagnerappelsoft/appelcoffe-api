const Service = require('./Service');

class BebidaService extends Service{
    constructor(){
        super('Bebida');
    }

    async getListagemBebida(page = 1, limit = 12, filters = {}) {
        const attributes = ['id', 'nome', 'preco', 'status'];
        return await this.getPaginated(page, limit, filters, attributes);
    }

}

module.exports = BebidaService;