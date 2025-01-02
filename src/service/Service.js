const dataSource =  require('../database/models')

class Service {
    constructor(model) {
        this.model = model;
    }

    async getPaginated(page = 1, limit = 12, filters = {}, attributes = null) {
        try {
            const offset = (page - 1) * limit;
            const queryOptions = {
                where: filters,
                limit,
                offset,
                order: [['id', 'DESC']]
            };

            if (attributes) {
                queryOptions.attributes = attributes;
            }

            const { count, rows } = await dataSource[this.model].findAndCountAll(queryOptions);

            return {
                items: rows,
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                itemsPerPage: limit
            };
        } catch (error) {
            throw new Error(`Error fetching paginated data for ${this.model}: ${error.message}`);
        }
    }


    async getAll(){
        try {
            const data = await dataSource[this.model].findAll();
            return data
        } catch (error) {
            
        }
    }







    
   async getAll22(filters = {}, attributes = null, options = {}) {
        try {
            const queryOptions = { 
                where: filters,
                include: [{
                    all: true,
                    nested: true
                }],
                ...options
            }; 
            if (attributes) {
                queryOptions.attributes = attributes;
            }
            return await dataSource[this.model].findAll(queryOptions);
        } catch (error) {
            throw new Error(`Error fetching all data for ${this.model}: ${error.message}`);
        }
    }

    async getById(id, options = {}) {
        try {
            console.log('Service getById - ID recebido:', id, 'tipo:', typeof id);
            const numericId = parseInt(id, 10);
            console.log('Service getById - ID convertido:', numericId, 'tipo:', typeof numericId);
            if (isNaN(numericId)) {
                throw new Error('ID deve ser um número válido');
            }
            const result = await dataSource[this.model].findByPk(numericId, options);
            if (!result) {
                throw new Error('Registro não encontrado');
            }
            return result;
        } catch (error) {
            console.error('Service getById - Erro:', error.message);
            throw new Error(`Error fetching data by ID for ${this.model}: ${error.message}`);
        }
    }

    async putData(params, data) {
        try {
            return await dataSource[this.model].update(data, { where: { ...params } });
        } catch (error) {
            throw new Error(`Error updating data for ${this.model}: ${error.message}`);
        }
    }

    async createData(data) {
        try {
            return await dataSource[this.model].create(data);
        } catch (error) {
            throw new Error(`Error creating data for ${this.model}: ${error.message}`);
        }
    }

    async deleteData(params) {
        try {
            return await dataSource[this.model].destroy({ where: { ...params } });
        } catch (error) {
            throw new Error(`Error deleting data for ${this.model}: ${error.message}`);
        }
    }
}

module.exports = Service;