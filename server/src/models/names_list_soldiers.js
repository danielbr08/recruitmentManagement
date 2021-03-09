module.exports = function (sequelize, DataTypes) {
  return sequelize.define('names_list_soldiers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    names_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    soldier_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['names_list_id', 'soldier_id']
        }
      ],
      timestamps: false,
      sequelize,
      tableName: 'names_list_soldiers',
      schema: 'public'
    });
};
