const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('documento_viagem', {
    ID_VIAGEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_DOCUMENTO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'documento_viagem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_VIAGEM" },
          { name: "ID_DOCUMENTO" },
        ]
      },
    ]
  });
};
