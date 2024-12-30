'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primeiro, vamos garantir que os setores existam
    const setores = await queryInterface.sequelize.query(
      `SELECT id FROM Setores ORDER BY id ASC;`
    );

    const setoresIds = setores[0].map(setor => setor.id);

    await queryInterface.bulkInsert('Pessoas', [
      { nome: 'João Silva', usuario: 'joao.silva', senha: '123456', foto: 'joao.jpg', setor_id: setoresIds[0], permissao: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Maria Santos', usuario: 'maria.santos', senha: '123456', foto: 'maria.jpg', setor_id: setoresIds[1], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Pedro Oliveira', usuario: 'pedro.oliveira', senha: '123456', foto: 'pedro.jpg', setor_id: setoresIds[2], permissao: 'user', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};