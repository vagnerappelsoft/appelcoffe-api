class Controller{
    constructor(service){
        this.service = service;
    }

    async ListarData(req, res){
        try {
            const data = await this.service.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async ListarId(req, res){
        try {
            const {id} = req.params;
            const data = await this.service.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async ModificarData(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.putData(id, req.body);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async CriarData(req, res){
        try {
            const data = await this.service.createData(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async DeletarData(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.deleteData({ id: id });
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    
    }
}

module.exports = Controller;