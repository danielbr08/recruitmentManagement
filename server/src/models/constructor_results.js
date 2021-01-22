/* jshint indent: 2 */
const {races} = require('./index') 

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('constructor_results', {
    constructor_results_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    constructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    points: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    }
  }, {
    timestamps:false,
    sequelize,
    tableName: 'constructor_results',
    schema: 'public'
  });
};
