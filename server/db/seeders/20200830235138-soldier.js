'use strict';
var dateFormat = require('dateformat');
var date=dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`INSERT INTO public.soldier( personal_number, version, squad, department, class, role, pakal_id, creation_date)
    VALUES ('66879568',1, 'squad1', 'department2', 'class2', 'role1', -1, '${date}';`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("DELETE FROM soldier")
  }
};
