/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seasons', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
     // unique: true
    }
  }, {
    indexes:[
      {
        unique:true,
        fields:['url']
      }
    ],
    timestamps:false,
    sequelize,
    tableName: 'seasons',
    schema: 'public'
  });
};
