const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagem', {
    ID_VIAGEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOME_VIAGEM: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    ORCAMENTO_VIAGEM: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    DATA_INICIO: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DATA_FIM: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DESCRICAO: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'viagem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_VIAGEM" },
        ]
      },
    ]
  });
};
