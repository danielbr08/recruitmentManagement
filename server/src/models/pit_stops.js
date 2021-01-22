/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pit_stops', {
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    indexes:[
      {
        unique:false,
        fields:['driver_id']
      },
      {
        unique:false,
        fields:['race_id']
      },
      {
        unique:false,
        fields:['race_id','driver_id']
      }

    ],
    timestamps:false,
    sequelize,
    tableName: 'pit_stops',
    schema: 'public'
  });
};
