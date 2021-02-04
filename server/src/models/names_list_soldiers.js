module.exports = function(sequelize, DataTypes) {
  return sequelize.define('names_list_soldiers', {
    names_list_soldiers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    names_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    soldier_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps:false,
    sequelize,
    tableName: 'names_list_soldiers',
    schema: 'public'
  });
};
