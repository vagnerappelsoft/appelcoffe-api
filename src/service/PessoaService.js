const Service = require('./Service');

class PessoaService extends Service {
  constructor() {
    super('pessoas');
  }
}

module.exports = PessoaService;