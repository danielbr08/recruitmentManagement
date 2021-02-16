module.exports = function(sequelize, DataTypes) {
    return sequelize.define('warehouse_unit', {
        warehouse_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pakal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps:false,
      sequelize,
      tableName: 'warehouse_unit',
      schema: 'public'
    });
  };
  