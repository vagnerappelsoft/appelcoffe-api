'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Setores', [
      {
        nome: 'Administração',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Atendimento',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Financeiro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Recursos Humanos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'TI',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Logística',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Compras',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Vendas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Produção',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Setores', null, {});
  }
};
