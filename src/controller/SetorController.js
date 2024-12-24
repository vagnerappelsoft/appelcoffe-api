const Controller = require("./Controller");
const SetorService = require("../service/SetorService");

const setorService = new SetorService();

class SetorController extends Controller {
    constructor() {
        super(setorService);
    }

    async handleRequest(req, res, next) {
        try {
            await super.handleRequest(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SetorController;
