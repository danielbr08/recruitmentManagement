/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('names_list', {
    names_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creationDate: {
      type: DataTypes.TIME,
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
