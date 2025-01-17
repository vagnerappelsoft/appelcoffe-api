'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adiciona apenas a coluna quantidade, já que as outras já existem
    await queryInterface.addColumn('Pedidos', 'quantidade', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pedidos', 'quantidade');
  }
};
