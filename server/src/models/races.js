/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('races', {
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    circuit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL",
      //unique: true
    }
  }, {
    indexes:[
      {
        unique:true,
        fields:['url']
      },
      {
        unique:false,
        desc:true,
        fields:['year']
      },
      {
        unique:false,
        fields:['circuit_id']
      },
      {
        unique:false,
        fields:['race_id']
      },
      {
        unique:false,
        desc:true,
        fields:['year','race_id']
      }
      
    ],
    timestamps:false,
    sequelize,
    tableName: 'races',
    schema: 'public'
  });
};
