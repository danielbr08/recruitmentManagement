/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('driver_standings', {
    driver_standings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      index:true
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      index:true
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
    tableName: 'driver_standings',
    schema: 'public'
  });
};
