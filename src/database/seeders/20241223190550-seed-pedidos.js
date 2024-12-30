'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primeiro, vamos pegar os IDs existentes de bebidas e pessoas
    const bebidas = await queryInterface.sequelize.query(
      `SELECT id, preco FROM Bebidas ORDER BY id ASC;`
    );

    const pessoas = await queryInterface.sequelize.query(
      `SELECT id FROM Pessoas ORDER BY id ASC;`
    );

    const bebidasIds = bebidas[0].map(bebida => ({ id: bebida.id, preco: bebida.preco }));
    const pessoasIds = pessoas[0].map(pessoa => pessoa.id);

    await queryInterface.bulkInsert('Pedidos', [
      { bebida_id: bebidasIds[0].id, cliente_id: pessoasIds[0], unitario: bebidasIds[0].preco, total: bebidasIds[0].preco * 2, data_compra: new Date('2024-01-01'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[1].id, cliente_id: pessoasIds[1], unitario: bebidasIds[1].preco, total: bebidasIds[1].preco * 2, data_compra: new Date('2024-01-02'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[2].id, cliente_id: pessoasIds[2], unitario: bebidasIds[2].preco, total: bebidasIds[2].preco * 2, data_compra: new Date('2024-01-03'), createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pedidos', null, {});
  }
};