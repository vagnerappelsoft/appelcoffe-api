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
      { nome: 'João Silva', usuario: 'joao.silva', senha: '123456', imagem: 'joao.jpg', setor_id: setoresIds[0], permissao: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Maria Santos', usuario: 'maria.santos', senha: '123456', imagem: 'maria.jpg', setor_id: setoresIds[1], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Pedro Oliveira', usuario: 'pedro.oliveira', senha: '123456', imagem: 'pedro.jpg', setor_id: setoresIds[2], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Ana Costa', usuario: 'ana.costa', senha: '123456', imagem: 'ana.jpg', setor_id: setoresIds[3], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Lucas Pereira', usuario: 'lucas.pereira', senha: '123456', imagem: 'lucas.jpg', setor_id: setoresIds[4], permissao: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Julia Ferreira', usuario: 'julia.ferreira', senha: '123456', imagem: 'julia.jpg', setor_id: setoresIds[5], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Marcos Souza', usuario: 'marcos.souza', senha: '123456', imagem: 'marcos.jpg', setor_id: setoresIds[6], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Carla Lima', usuario: 'carla.lima', senha: '123456', imagem: 'carla.jpg', setor_id: setoresIds[7], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Roberto Alves', usuario: 'roberto.alves', senha: '123456', imagem: 'roberto.jpg', setor_id: setoresIds[8], permissao: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Patricia Rocha', usuario: 'patricia.rocha', senha: '123456', imagem: 'patricia.jpg', setor_id: setoresIds[9], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Fernando Santos', usuario: 'fernando.santos', senha: '123456', imagem: 'fernando.jpg', setor_id: setoresIds[10], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Amanda Silva', usuario: 'amanda.silva', senha: '123456', imagem: 'amanda.jpg', setor_id: setoresIds[11], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Ricardo Oliveira', usuario: 'ricardo.oliveira', senha: '123456', imagem: 'ricardo.jpg', setor_id: setoresIds[12], permissao: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Beatriz Costa', usuario: 'beatriz.costa', senha: '123456', imagem: 'beatriz.jpg', setor_id: setoresIds[13], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Gabriel Pereira', usuario: 'gabriel.pereira', senha: '123456', imagem: 'gabriel.jpg', setor_id: setoresIds[14], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Carolina Lima', usuario: 'carolina.lima', senha: '123456', imagem: 'carolina.jpg', setor_id: setoresIds[15], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Thiago Martins', usuario: 'thiago.martins', senha: '123456', imagem: 'thiago.jpg', setor_id: setoresIds[16], permissao: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Isabela Santos', usuario: 'isabela.santos', senha: '123456', imagem: 'isabela.jpg', setor_id: setoresIds[17], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Rafael Souza', usuario: 'rafael.souza', senha: '123456', imagem: 'rafael.jpg', setor_id: setoresIds[18], permissao: 'user', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Larissa Silva', usuario: 'larissa.silva', senha: '123456', imagem: 'larissa.jpg', setor_id: setoresIds[19], permissao: 'user', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};