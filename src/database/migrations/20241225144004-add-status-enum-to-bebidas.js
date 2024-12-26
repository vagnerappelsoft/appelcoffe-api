'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bebidas', 'status', {
      type: Sequelize.ENUM('Ativo', 'Inativo'),
      allowNull: false,
      defaultValue: 'Ativo' // Adicione um valor padrão se necessário
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverter a alteração da coluna para o estado anterior, se necessário
    await queryInterface.changeColumn('Bebidas', 'status', {
      type: Sequelize.ENUM, // Supondo que era STRING antes, ajuste conforme necessário
      allowNull: true
    });
  }
};
