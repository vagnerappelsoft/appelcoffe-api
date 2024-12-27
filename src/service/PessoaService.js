const Service = require('./Service');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
    console.log('PessoaService initialized');
  }

    async getListagem(filters = {}) {
        return await this.getAll(filters, ['id', 'foto', 'nome', 'setor_id']); // Seleciona apenas as colunas necessárias
    }
}

module.exports = PessoaService;

