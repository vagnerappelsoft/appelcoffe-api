const Service = require('./Service');


class BebidaService extends Service{
    constructor(){
        super('Bebida');
    }

    async getListagemBebida(params) {
        return await this.getAll(params, ['id', 'nome', 'preco', 'status']);
    }

}

module.exports = BebidaService;