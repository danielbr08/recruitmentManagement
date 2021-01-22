/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drivers', {
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    driver_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    forename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
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
        fields:['surname','forename']
      }
    ],
    timestamps:false,
    sequelize,
    tableName: 'drivers',
    schema: 'public'

  });
};
