const dataSource =  require('../database/models')
class Service {
    constructor(model) {
        this.model = model;
        console.log(`Service initialized with model: ${model}`);
        console.log(`Available models: ${Object.keys(dataSource)}`);
    }

    async getAll() {
        try {
            return await dataSource[this.model].findAll();
        } catch (error) {
            throw new Error(`Error fetching all data for ${this.model}: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await dataSource[this.model].findByPk(id);
        } catch (error) {
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