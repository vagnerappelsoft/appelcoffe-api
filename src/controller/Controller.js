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
            console.log('Controller ListarId - ID dos parâmetros:', id, 'tipo:', typeof id);
            const data = await this.service.getById(id);
            res.status(200).json(data);
        } catch (error) {
            console.error('Controller ListarId - Erro:', error.message);
            if (error.message.includes('ID deve ser um número válido')) {
                res.status(400).json({ error: 'ID inválido: deve ser um número' });
            } else if (error.message.includes('Registro não encontrado')) {
                res.status(404).json({ error: 'Registro não encontrado' });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async ModificarData(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.putData({ id: id }, req.body);
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
            console.log(`ID recebido para deleção: ${id}`); // Log do ID recebido
            const data = await this.service.deleteData(id);
            console.log(`Resultado da deleção: ${JSON.stringify(data)}`); // Log do resultado da deleção
            res.status(200).json(data);
        }
        catch(error){
            console.error(`Erro ao deletar: ${error.message}`); // Log de erro
            res.status(500).json({ error: error.message });
        }
    
    }
}

module.exports = Controller;