/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    names_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    current_task: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    timestamps:false,
    sequelize,
    tableName: 'task',
    schema: 'public'
  });
};
