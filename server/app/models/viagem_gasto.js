const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagem_gasto', {
    ID_VIAGEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_GASTO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'viagem_gasto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_GASTO" },
          { name: "ID_VIAGEM" },
        ]
      },
    ]
  });
};
