/* jshint indent: 2 */
// const {races} = require('./index') 

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('signature_item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes:[
      {
        unique:true,
        fields:['item', 'serial_number','quantity']
      }
    ],
    timestamps:false,
    sequelize,
    tableName: 'signature_item',
    schema: 'public'
  });
};
