const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagem_usuario', {
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
      primaryKey: true
    },
    CD_TIPO_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'viagem_usuario',
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
    ]
  });
};
