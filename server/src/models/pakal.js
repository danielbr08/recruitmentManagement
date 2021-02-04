module.exports = function(sequelize, DataTypes) {
    return sequelize.define('pakal', {
        pakal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
  