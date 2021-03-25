const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_usuario', {
    CD_TIPO_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOME_TIPO: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CD_TIPO_USUARIO" },
        ]
      },
    ]
  });
};
