'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.changeColumn('Pessoas', 'permissao', {
      type: Sequelize.ENUM('ADMIN', 'USER', 'AUX'),
      allowNull: false,
      defaultValue: 'USER'
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.changeColumn('Pessoas', 'permissao', {
      type: Sequelize.ENUM,
      allowNull: false
    })
  }
};
