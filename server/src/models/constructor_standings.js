/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('constructor_standings', {
    constructor_standings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    constructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    points: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    position_text: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps:false,
    sequelize,
    tableName: 'constructor_standings',
    schema: 'public'
  });
};
