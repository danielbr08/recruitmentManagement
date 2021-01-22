/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('constructors', {
    constructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    constructor_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      //unique: true
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    }
  }, {
    indexes:[
      {
        unique:true,
        fields:['name']
      }
    ],
    timestamps:false,
    sequelize,
    tableName: 'constructors',
    schema: 'public'
  });
};
