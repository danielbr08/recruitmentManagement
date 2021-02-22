/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('soldier', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    personal_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    squad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pakal_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.TIME,
      allowNull: false
    }
  },
    {
      timestamps:false,
      sequelize,
      tableName: 'soldier',
      schema: 'public',
    indexes: [
        {
            name: 'unique_index',
            unique: true,
            fields: ['personal_number', 'version']
        }
    ]
    });
};
