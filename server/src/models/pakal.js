module.exports = function(sequelize, DataTypes) {
    return sequelize.define('pakal', {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      signature_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      }
    }, {
      timestamps:false,
      sequelize,
      tableName: 'pakal',
      schema: 'public'
    });
  };
  