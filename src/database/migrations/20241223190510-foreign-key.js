'use strict';

 /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Pedidos', 'cliente_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Pessoas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    
    await queryInterface.addColumn('Pedidos', 'bebida_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Bebidas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
      
    })

    await queryInterface.addColumn('Pedidos', 'quantidade', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    })

    await queryInterface.addColumn('Pessoas', 'setor_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Setores',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    
    }
    )

  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Pedidos', 'cliente_id');
    await queryInterface.removeColumn('Pedidos', 'bebida_id');
    await queryInterface.removeColumn('Pedidos', 'quantidade');
    await queryInterface.removeColumn('Pessoas', 'setor_id');
  }
};
