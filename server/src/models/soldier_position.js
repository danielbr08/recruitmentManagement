/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('soldier_position', {
    soldier_position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    squad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    pakal_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {  
    timestamps:false,
    sequelize,
    tableName: 'soldier_position',
    schema: 'public'
  });
};
