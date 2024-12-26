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
    unitario: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    data_compra: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'Pedidos',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Pedido;
};