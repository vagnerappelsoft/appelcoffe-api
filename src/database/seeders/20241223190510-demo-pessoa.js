'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'John Doe',
        usuario: 'johndoe',
        senha: 'password123',
        foto: 'johndoe.jpg',
        permissao: 'ADMIN',
        setor_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Jane Smith',
        usuario: 'janesmith',
        senha: 'password123',
        foto: 'janesmith.jpg',
        permissao: 'USER',
        setor_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Alice Johnson',
        usuario: 'alicejohnson',
        senha: 'password123',
        foto: 'alicejohnson.jpg',
        permissao: 'USER',
        setor_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Bob Brown',
        usuario: 'bobbrown',
        senha: 'password123',
        foto: 'bobbrown.jpg',
        permissao: 'USER',
        setor_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Charlie Davis',
        usuario: 'charliedavis',
        senha: 'password123',
        foto: 'charliedavis.jpg',
        permissao: 'USER',
        setor_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Diana Evans',
        usuario: 'dianaevans',
        senha: 'password123',
        foto: 'dianaevans.jpg',
        permissao: 'USER',
        setor_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Eve Foster',
        usuario: 'evefoster',
        senha: 'password123',
        foto: 'evefoster.jpg',
        permissao: 'USER',
        setor_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Frank Green',
        usuario: 'frankgreen',
        senha: 'password123',
        foto: 'frankgreen.jpg',
        permissao: 'USER',
        setor_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Grace Harris',
        usuario: 'graceharris',
        senha: 'password123',
        foto: 'graceharris.jpg',
        permissao: 'USER',
        setor_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Henry Jackson',
        usuario: 'henryjackson',
        senha: 'password123',
        foto: 'henryjackson.jpg',
        permissao: 'USER',
        setor_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
