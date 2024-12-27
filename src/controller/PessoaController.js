const Controller = require("./Controller");
const PessoaService = require("../service/PessoaService");

const pessoaService = new PessoaService();

class PessoaController extends Controller {
    constructor() {
        super(pessoaService);
    }

    // Lista apenas os dados filtrados (para listagem)
    async ListarDataFiltrada(req, res) {
        try {
            const data = await this.service.getListagem(req.query); // Usa filtros opcionais
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PessoaController;
