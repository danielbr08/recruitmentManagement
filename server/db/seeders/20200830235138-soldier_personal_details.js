'use strict';
var dateFormat = require('dateformat');
var date=dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`INSERT INTO soldier_personal_details VALUES ('66879568','Daniel','Brosh','${date}');`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("DELETE FROM soldier_personal_details")
  }
};
