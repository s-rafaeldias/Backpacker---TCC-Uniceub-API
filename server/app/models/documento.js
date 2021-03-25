const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('documento', {
    ID_DOCUMENTO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOME_DOCUMENTO: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    LINK_IMAGEM_DOCUMENTO: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    CD_CATEGORIA_DOCUMENTO: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'documento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_DOCUMENTO" },
        ]
      },
    ]
  });
};
