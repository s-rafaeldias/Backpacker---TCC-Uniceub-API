const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gasto', {
    ID_GASTO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOME_GASTO: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    DESCRICAO_GASTO: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    VALOR_GASTO: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    LINK_IMAGEM_GASTO: {
      type: DataTypes.CHAR(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gasto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_GASTO" },
        ]
      },
    ]
  });
};
