/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('soldier_personal_details', {
    personal_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'soldier_personal_details',
    schema: 'public'
  });
};
