/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('results', {
    result_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //defaultValue: 0
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
      allowNull: true
    },
    grid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    position_text: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    position_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    points: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    laps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fastest_lap: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    fastest_lap_time: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    fastest_lap_speed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'results',
    schema: 'public'
  });
};
