'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      firstName: 'Super Admin',
      lastName: 'User',
      username: 'superadmin',
      password: '$2b$10$Pn7zwQiwLJxxt9hP2XtGF.4imo/vkux0hs2onPb5V.BuxPTpAMoAe',
      role: 'superadmin',
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
