const Service = require('./Service');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
    console.log('PessoaService initialized');
  }
}

module.exports = PessoaService;