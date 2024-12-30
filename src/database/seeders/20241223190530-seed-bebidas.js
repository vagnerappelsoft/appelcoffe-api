'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bebidas', [
      { nome: 'Café Expresso', descricao: 'Café puro e forte', preco: 4.50, imagem: 'expresso.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Cappuccino', descricao: 'Café com leite vaporizado e espuma', preco: 7.50, imagem: 'cappuccino.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Latte', descricao: 'Café com leite cremoso', preco: 8.00, imagem: 'latte.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bebidas', null, {});
  }
};