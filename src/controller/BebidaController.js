const Controller = require('./Controller');
const BebidaService = require('../service/BebidaService');


const bebidaService = new BebidaService();

class BebidaController extends Controller{
    constructor(){
        super(bebidaService);
    }

    async listarDadosFiltradosBebidas(req, res){
        try{
            const data = await this.service.getListagemBebida(req.query);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
}
}

module.exports = BebidaController;