const Controller = require('./Controller');
const BebidaService = require('../service/BebidaService');


const bebidaService = new BebidaService();

class BebidaController extends Controller{
    constructor(){
        super(bebidaService);
    }
    
}

module.exports = BebidaController;