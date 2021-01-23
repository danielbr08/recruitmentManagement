/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    // creation_date: {
    //   type: DataTypes.timestamps,
    //   allowNull: false
    // },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    names_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_current_task: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps:false,
    sequelize,
    tableName: 'task',
    schema: 'public'
  });
};
