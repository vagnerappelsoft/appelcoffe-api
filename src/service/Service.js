const { where } = require("sequelize");
const dataSource = require("../database/models");

class Service {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await dataSource[this.model].findAll();
        } catch (error) {
            throw new Error(`Error fetching all data: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await dataSource[this.model].findByPk(id);
        } catch (error) {
            throw new Error(`Error fetching data by ID: ${error.message}`);
        }
    }

    async putData(params, data) {
        try {
            return await dataSource[this.model].update(data, { where: { ...params } });
        } catch (error) {
            throw new Error(`Error updating data: ${error.message}`);
        }
    }

    async createData(data) {
        try {
            return await dataSource[this.model].create(data);
        } catch (error) {
            throw new Error(`Error creating data: ${error.message}`);
        }
    }

    async deleteData(params) {
        try {
            return await dataSource[this.model].destroy({ where: { ...params } });
        } catch (error) {
            throw new Error(`Error deleting data: ${error.message}`);
        }
    }
}

module.exports = Service;