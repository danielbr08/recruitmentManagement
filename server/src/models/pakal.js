module.exports = function(sequelize, DataTypes) {
    return sequelize.define('pakal', {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      pakal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      indexes:[
        {
          unique:true,
          fields:['signature_id', 'name']
        }
      ],
      timestamps:false,
      sequelize,
      tableName: 'pakal',
      schema: 'public'
    });
  };
  