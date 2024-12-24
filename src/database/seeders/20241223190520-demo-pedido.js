'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pedidos', [
      {
        unitario: 5.00,
        total: 10.00,
        data_compra: '2023-12-23',
        cliente_id: 1,
        bebida_id: 1,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 3.50,
        total: 7.00,
        data_compra: '2023-12-24',
        cliente_id: 2,
        bebida_id: 2,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 4.00,
        total: 8.00,
        data_compra: '2023-12-25',
        cliente_id: 3,
        bebida_id: 3,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 6.00,
        total: 12.00,
        data_compra: '2023-12-26',
        cliente_id: 4,
        bebida_id: 4,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 2.50,
        total: 5.00,
        data_compra: '2023-12-27',
        cliente_id: 5,
        bebida_id: 5,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 7.00,
        total: 14.00,
        data_compra: '2023-12-28',
        cliente_id: 6,
        bebida_id: 6,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 8.00,
        total: 16.00,
        data_compra: '2023-12-29',
        cliente_id: 7,
        bebida_id: 7,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 9.00,
        total: 18.00,
        data_compra: '2023-12-30',
        cliente_id: 8,
        bebida_id: 8,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 10.00,
        total: 20.00,
        data_compra: '2023-12-31',
        cliente_id: 9,
        bebida_id: 9,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unitario: 11.00,
        total: 22.00,
        data_compra: '2024-01-01',
        cliente_id: 10,
        bebida_id: 10,
        quantidade: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pedidos', null, {});
  }
};
