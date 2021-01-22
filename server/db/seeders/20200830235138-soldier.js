'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("INSERT INTO soldier VALUES (1,'66879568','Daniel','Brosh');")
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("DELETE FROM soldier")
  }
};
