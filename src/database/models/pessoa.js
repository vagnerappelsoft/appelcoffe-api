'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    usuario: DataTypes.STRING,
    senha: DataTypes.STRING,
    foto: DataTypes.STRING,
    permissao: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    timestamps: true,
    paranoid: true
  });
  return Pessoa;
};