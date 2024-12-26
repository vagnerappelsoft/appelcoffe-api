'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const bebidas = await queryInterface.sequelize.query(
      `SELECT id, preco FROM Bebidas;`
    );

    const bebidaMap = bebidas[0].reduce((acc, bebida) => {
      acc[bebida.id] = bebida.preco;
      return acc;
    }, {});

    await queryInterface.bulkInsert('Pedidos', [
      { unitario: bebidaMap[1], total: bebidaMap[1] * 2, data_compra: new Date(), bebida_id: 1, cliente_id: 1, quantidade: 2, createdAt: new Date(), updatedAt: new Date() },
      { unitario: bebidaMap[2], total: bebidaMap[2] * 1, data_compra: new Date(), bebida_id: 2, cliente_id: 2, quantidade: 1, createdAt: new Date(), updatedAt: new Date() },
      { unitario: bebidaMap[3], total: bebidaMap[3] * 3, data_compra: new Date(), bebida_id: 3, cliente_id: 3, quantidade: 3, createdAt: new Date(), updatedAt: new Date() },
      { unitario: bebidaMap[4], total: bebidaMap[4] * 1, data_compra: new Date(), bebida_id: 4, cliente_id: 4, quantidade: 1, createdAt: new Date(), updatedAt: new Date() },
      { unitario: bebidaMap[5], total: bebidaMap[5] * 2, data_compra: new Date(), bebida_id: 5, cliente_id: 5, quantidade: 2, createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pedidos', null, {});
  }
};