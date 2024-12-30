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
      { bebida_id: bebidasIds[1].id, cliente_id: pessoasIds[1], unitario: bebidasIds[1].preco, total: bebidasIds[1].preco * 2, data_compra: new Date('2024-01-01'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[2].id, cliente_id: pessoasIds[2], unitario: bebidasIds[2].preco, total: bebidasIds[2].preco * 2, data_compra: new Date('2024-01-02'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[3].id, cliente_id: pessoasIds[3], unitario: bebidasIds[3].preco, total: bebidasIds[3].preco * 2, data_compra: new Date('2024-01-02'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[4].id, cliente_id: pessoasIds[4], unitario: bebidasIds[4].preco, total: bebidasIds[4].preco * 2, data_compra: new Date('2024-01-03'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[5].id, cliente_id: pessoasIds[5], unitario: bebidasIds[5].preco, total: bebidasIds[5].preco * 2, data_compra: new Date('2024-01-03'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[6].id, cliente_id: pessoasIds[6], unitario: bebidasIds[6].preco, total: bebidasIds[6].preco * 2, data_compra: new Date('2024-01-04'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[7].id, cliente_id: pessoasIds[7], unitario: bebidasIds[7].preco, total: bebidasIds[7].preco * 2, data_compra: new Date('2024-01-04'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[8].id, cliente_id: pessoasIds[8], unitario: bebidasIds[8].preco, total: bebidasIds[8].preco * 2, data_compra: new Date('2024-01-05'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[9].id, cliente_id: pessoasIds[9], unitario: bebidasIds[9].preco, total: bebidasIds[9].preco * 2, data_compra: new Date('2024-01-05'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[10].id, cliente_id: pessoasIds[10], unitario: bebidasIds[10].preco, total: bebidasIds[10].preco * 2, data_compra: new Date('2024-01-06'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[11].id, cliente_id: pessoasIds[11], unitario: bebidasIds[11].preco, total: bebidasIds[11].preco * 2, data_compra: new Date('2024-01-06'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[12].id, cliente_id: pessoasIds[12], unitario: bebidasIds[12].preco, total: bebidasIds[12].preco * 2, data_compra: new Date('2024-01-07'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[13].id, cliente_id: pessoasIds[13], unitario: bebidasIds[13].preco, total: bebidasIds[13].preco * 2, data_compra: new Date('2024-01-07'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[14].id, cliente_id: pessoasIds[14], unitario: bebidasIds[14].preco, total: bebidasIds[14].preco * 2, data_compra: new Date('2024-01-08'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[15].id, cliente_id: pessoasIds[15], unitario: bebidasIds[15].preco, total: bebidasIds[15].preco * 2, data_compra: new Date('2024-01-08'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[16].id, cliente_id: pessoasIds[16], unitario: bebidasIds[16].preco, total: bebidasIds[16].preco * 2, data_compra: new Date('2024-01-09'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[17].id, cliente_id: pessoasIds[17], unitario: bebidasIds[17].preco, total: bebidasIds[17].preco * 2, data_compra: new Date('2024-01-09'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[18].id, cliente_id: pessoasIds[18], unitario: bebidasIds[18].preco, total: bebidasIds[18].preco * 2, data_compra: new Date('2024-01-10'), createdAt: new Date(), updatedAt: new Date() },
      { bebida_id: bebidasIds[19].id, cliente_id: pessoasIds[19], unitario: bebidasIds[19].preco, total: bebidasIds[19].preco * 2, data_compra: new Date('2024-01-10'), createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pedidos', null, {});
  }
};