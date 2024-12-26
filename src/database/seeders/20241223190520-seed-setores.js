'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Setores', [
      { nome: 'Financeiro', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'RH', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'TI', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Marketing', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Vendas', createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Setores', null, {});
  }
};