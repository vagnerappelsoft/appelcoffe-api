const Service = require('./Service');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
    console.log('PessoaService initialized');
  }

  async getListagemPessoa(page = 1, limit = 12, filters = {}) {
    try {
      const attributes = ['id', 'foto', 'nome', 'setor_id'];
      return await this.getPaginated(page, limit, filters, attributes);
    } catch (error) {
      throw new Error(`Error fetching paginated pessoas: ${error.message}`);
    }
  }
}

module.exports = PessoaService;
