'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bebidas', [
      {
        nome: 'Café Expresso',
        descricao: 'Café expresso forte e encorpado.',
        preco: 5.00,
        imagem: 'cafe-expresso.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cappuccino',
        descricao: 'Cappuccino cremoso com leite vaporizado.',
        preco: 7.00,
        imagem: 'cappuccino.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Latte',
        descricao: 'Café com leite vaporizado.',
        preco: 6.00,
        imagem: 'latte.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Mocha',
        descricao: 'Café com chocolate e leite vaporizado.',
        preco: 8.00,
        imagem: 'mocha.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Americano',
        descricao: 'Café diluído em água quente.',
        preco: 4.00,
        imagem: 'americano.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Macchiato',
        descricao: 'Café expresso com espuma de leite.',
        preco: 6.50,
        imagem: 'macchiato.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Flat White',
        descricao: 'Café com leite vaporizado e pouca espuma.',
        preco: 7.50,
        imagem: 'flat-white.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Affogato',
        descricao: 'Café expresso com sorvete de baunilha.',
        preco: 9.00,
        imagem: 'affogato.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Irish Coffee',
        descricao: 'Café com whisky e chantilly.',
        preco: 10.00,
        imagem: 'irish-coffee.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Café Gelado',
        descricao: 'Café gelado com leite e açúcar.',
        preco: 5.50,
        imagem: 'cafe-gelado.jpg',
        status: 'Ativo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bebidas', null, {});
  }
};
