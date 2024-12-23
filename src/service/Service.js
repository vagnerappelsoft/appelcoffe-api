const { where } = require("sequelize")
const dataSource = require("../database/models") 

class Service{
    constructor(model){
        this.model = model
    }

    async getAll(){
        return await dataSource[this.model].findAll()
    }

    async getById(id){
        return await dataSource[this.model].findbyPk(id)

    }

    async putData(params, data){
        return await dataSource[this.model].update(data, {where: {...params}})
    }

    async createData(data){
        return await dataSource[this.model].create(data)
    }

    async deleteData(params){
        return await dataSource[this.model].destroy({where: {...params}})
    }


}