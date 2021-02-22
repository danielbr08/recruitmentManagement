module.exports = function(sequelize, DataTypes) {
    return sequelize.define('squad_pakal_allocation', {
        id: {
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
      warehouse_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      squad1_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      squad2_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      squad3_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      headquarters_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      support_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      warehouse_allocated: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      squad1_allocated: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      squad2_allocated: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      squad3_allocated: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      headquarters_allocated: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      support_allocated: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps:false,
      sequelize,
      tableName: 'squad_pakal_allocation',
      schema: 'public'
    });
  };
  