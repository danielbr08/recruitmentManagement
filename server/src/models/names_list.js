/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('names_list', {
    names_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soldiers_ids: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
        },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: -1
    }
    // ,
    // creationDate: {
    //   type: DataTypes.timestamps,
    //   allowNull: false
    // }
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
