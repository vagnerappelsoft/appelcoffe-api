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
    permissao: {
      type: DataTypes.ENUM,
      values: ['USER', 'ADMIN', 'AUX'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'Pessoas',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'

  });
  return Pessoa;
};