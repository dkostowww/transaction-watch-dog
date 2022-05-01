'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Transactions', {
      fields: ['configuration_id'],
      type: 'foreign key',
      name: 'transaction_configuration_relation',
      references: {
        table: 'Configurations',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeConstraint('Transactions', 'transaction_configuration_relation');
  }
};
