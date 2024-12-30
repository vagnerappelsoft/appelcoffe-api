'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Setores', [
      { nome: 'Administração', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Recursos Humanos', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Financeiro', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Setores', null, {});
  }
};