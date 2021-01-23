/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('soldier', {
    soldier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    personal_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    soldier_position_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    }
  
  }, {
    indexes:[
      {
        unique:true,
        fields:['personal_number']
      }
    ],
    timestamps:false,
    sequelize,
    tableName: 'soldier',
    schema: 'public'
  });
};
