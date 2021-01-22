/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('driver_likes', {
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {  
    timestamps:false,
    sequelize,
    tableName: 'driver_likes',
    schema: 'public'
  });
};
