'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bebidas', [
      { nome: 'Café Expresso', descricao: 'Café forte e encorpado', preco: 5.00, imagem: 'cafe-expresso.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Cappuccino', descricao: 'Café com leite e espuma', preco: 7.50, imagem: 'cappuccino.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Latte', descricao: 'Café com leite vaporizado', preco: 6.00, imagem: 'latte.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Mocha', descricao: 'Café com chocolate', preco: 8.00, imagem: 'mocha.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Americano', descricao: 'Café diluído em água', preco: 4.00, imagem: 'americano.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bebidas', null, {});
  }
};