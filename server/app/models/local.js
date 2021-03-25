const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('local', {
    ID_LOCAL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DATA_PLANEJADA: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    VISITADO: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    TS_VISITADO: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DESCRICAO: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'local',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_LOCAL" },
        ]
      },
    ]
  });
};
