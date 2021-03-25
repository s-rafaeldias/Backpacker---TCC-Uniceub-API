const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categoria_documento', {
    CD_CATEGORIA_DOCUMENTO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOME_CATEGORIA: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categoria_documento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CD_CATEGORIA_DOCUMENTO" },
        ]
      },
    ]
  });
};
