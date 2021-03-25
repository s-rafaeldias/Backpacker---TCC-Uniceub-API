const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagens_do_usuario', {
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'ID_USUARIO'
      }
    },
    ID_VIAGEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'viagem',
        key: 'ID_VIAGEM'
      }
    },
    CD_TIPO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_usuario',
        key: 'CD_TIPO_USUARIO'
      }
    }
  }, {
    sequelize,
    tableName: 'viagens_do_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_USUARIO" },
          { name: "ID_VIAGEM" },
        ]
      },
      {
        name: "IX_Relationship3",
        using: "BTREE",
        fields: [
          { name: "CD_TIPO" },
        ]
      },
      {
        name: "Relationship2",
        using: "BTREE",
        fields: [
          { name: "ID_VIAGEM" },
        ]
      },
    ]
  });
};
