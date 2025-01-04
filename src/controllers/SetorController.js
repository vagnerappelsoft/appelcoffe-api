const Controller = require("./Controller");
const SetorService = require("../service/SetorService");

const setorService = new SetorService();

class SetorController extends Controller {
    constructor() {
        super(setorService);
    }

   
}

module.exports = SetorController;
