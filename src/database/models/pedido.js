'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido.init({
    bebida_id: DataTypes.INTEGER,
    pessoa_id: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    unitario: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    data_compra: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};