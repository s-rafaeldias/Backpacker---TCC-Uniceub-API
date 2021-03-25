const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_viagem', {
    CD_TIPO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipo_usuario',
        key: 'CD_TIPO_USUARIO'
      }
    },
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'viagens_do_usuario',
        key: 'ID_USUARIO'
      }
    },
    ID_VIAGEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'viagens_do_usuario',
        key: 'ID_VIAGEM'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario_viagem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CD_TIPO" },
          { name: "ID_USUARIO" },
          { name: "ID_VIAGEM" },
        ]
      },
      {
        name: "Relationship5",
        using: "BTREE",
        fields: [
          { name: "ID_USUARIO" },
          { name: "ID_VIAGEM" },
        ]
      },
    ]
  });
};
