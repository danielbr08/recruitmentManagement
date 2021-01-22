const db = require('../src/models');

db.sequelize.sync({ alter: true }).catch(console.error)
