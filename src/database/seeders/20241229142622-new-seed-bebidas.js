'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bebidas', [
      { nome: 'Café Expresso', descricao: 'Café puro e forte', preco: 4.50, imagem: 'expresso.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Cappuccino', descricao: 'Café com leite vaporizado e espuma', preco: 7.50, imagem: 'cappuccino.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Latte', descricao: 'Café com leite cremoso', preco: 8.00, imagem: 'latte.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Mocha', descricao: 'Café com chocolate e leite', preco: 9.00, imagem: 'mocha.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Café Americano', descricao: 'Café expresso com água', preco: 5.00, imagem: 'americano.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Chocolate Quente', descricao: 'Chocolate cremoso com leite', preco: 8.50, imagem: 'chocolate.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Chá Verde', descricao: 'Chá verde tradicional', preco: 5.50, imagem: 'cha-verde.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Café Gelado', descricao: 'Café expresso com gelo', preco: 6.50, imagem: 'cafe-gelado.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Frappuccino', descricao: 'Bebida gelada com café e creme', preco: 12.00, imagem: 'frappuccino.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Chai Latte', descricao: 'Chá indiano com leite e especiarias', preco: 9.50, imagem: 'chai-latte.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Macchiato', descricao: 'Café expresso com espuma de leite', preco: 6.00, imagem: 'macchiato.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Café com Canela', descricao: 'Café aromatizado com canela', preco: 5.50, imagem: 'cafe-canela.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Chocolate Gelado', descricao: 'Chocolate cremoso gelado', preco: 9.00, imagem: 'chocolate-gelado.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Chá de Camomila', descricao: 'Chá calmante de camomila', preco: 4.50, imagem: 'cha-camomila.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Café Duplo', descricao: 'Dose dupla de café expresso', preco: 7.00, imagem: 'cafe-duplo.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Matcha Latte', descricao: 'Chá verde matcha com leite', preco: 10.50, imagem: 'matcha-latte.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Irish Coffee', descricao: 'Café com whiskey irlandês', preco: 15.00, imagem: 'irish-coffee.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Café com Leite', descricao: 'Café tradicional com leite', preco: 5.00, imagem: 'cafe-leite.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Chá Gelado', descricao: 'Chá refrescante gelado', preco: 6.00, imagem: 'cha-gelado.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Affogato', descricao: 'Sorvete de baunilha com café expresso', preco: 11.00, imagem: 'affogato.jpg', status: 'Ativo', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bebidas', null, {});
  }
};