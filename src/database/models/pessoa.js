'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.belongsTo(models.Setor, {
        foreignKey: 'setor_id',
        as: 'Setor'
      });
    }

    checkPassword(senha) {
      return bcrypt.compare(senha, this.senha);
    }
  }

  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    usuario: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    setor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Setores',
        key: 'id'
      }
    },
    permissao: {
      type: DataTypes.ENUM,
      values: ['USER', 'ADMIN', 'AUX'],
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (pessoa, options) => {
        if (pessoa.senha) {
          const salt = await bcrypt.genSaltSync(7);
          pessoa.senha = bcrypt.hashSync(pessoa.senha, salt);
        }
      },
      beforeUpdate: async (pessoa, options) => {
        if (pessoa.changed('senha')) {
          const salt = await bcrypt.genSaltSync(7);
          pessoa.senha = bcrypt.hashSync(pessoa.senha, salt);
        }
      }
    },
    sequelize,
    modelName: 'Pessoa',
    tableName: 'Pessoas',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return Pessoa;
};