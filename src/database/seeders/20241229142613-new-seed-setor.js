'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Setores', [
      { nome: 'Administração', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Recursos Humanos', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Financeiro', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Comercial', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Marketing', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Operações', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Tecnologia', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Logística', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Produção', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Qualidade', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Atendimento', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Vendas', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Compras', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Manutenção', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Almoxarifado', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Jurídico', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Contabilidade', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Facilities', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Desenvolvimento', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Suporte', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Setores', null, {});
  }
};