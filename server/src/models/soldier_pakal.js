module.exports = function(sequelize, DataTypes) {
    return sequelize.define('soldier_pakal', {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      soldier_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pakal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps:false,
      sequelize,
      tableName: 'soldier_pakal',
      schema: 'public'
    });
  };
  