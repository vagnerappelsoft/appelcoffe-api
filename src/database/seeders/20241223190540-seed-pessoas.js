'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [
      { nome: 'João Silva', usuario: 'joao', senha: 'senha123', foto: 'joao.jpg', permissao: 'ADMIN', setor_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Maria Souza', usuario: 'maria', senha: 'senha123', foto: 'maria.jpg', permissao: 'USER', setor_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Carlos Pereira', usuario: 'carlos', senha: 'senha123', foto: 'carlos.jpg', permissao: 'USER', setor_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Ana Oliveira', usuario: 'ana', senha: 'senha123', foto: 'ana.jpg', permissao: 'USER', setor_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Pedro Santos', usuario: 'pedro', senha: 'senha123', foto: 'pedro.jpg', permissao: 'USER', setor_id: 5, createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};