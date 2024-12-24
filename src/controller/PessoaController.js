const Controller = require("./Controller");
const PessoaService = require("../service/PessoaService");

const pessoaService = new PessoaService();

class PessoaController extends Controller {
    constructor() {
        super(pessoaService);
    }
}

module.exports = PessoaController;