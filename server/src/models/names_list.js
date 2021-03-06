/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('names_list', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'names_list',
    schema: 'public'
  });
};
