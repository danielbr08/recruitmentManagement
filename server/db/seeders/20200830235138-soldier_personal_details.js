'use strict';
var dateFormat = require('dateformat');
var date=dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
console.log("date to insert: ", date);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`INSERT INTO soldier_personal_details VALUES (1,'66879568','Daniel','Brosh','${date}');`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("DELETE FROM soldier_personal_details")
  }
};
