'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Pessoas', 'foto', 'imagem');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Pessoas', 'imagem', 'foto');
  }
};
