/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('qualifying', {
    qualify_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    constructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    q1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    q2: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    q3: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    }
  }, {
    timestamps:false,
    sequelize,
    tableName: 'qualifying',
    schema: 'public'
  });
};
