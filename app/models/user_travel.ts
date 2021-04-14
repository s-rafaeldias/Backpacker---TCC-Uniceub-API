import { Sequelize, Model, DataTypes } from "sequelize";

export interface UserTravelAttributes {
  id_usuario_viagem: number;
  id_usuario: number;
  id_viagem: number;
}

class UserTravelModel extends Model<UserTravelAttributes>
  implements UserTravelAttributes {
  public id_usuario_viagem!: number;
  public id_usuario!: number;
  public id_viagem!: number;
}

export default function(sequelize: Sequelize) {
  return sequelize.define<UserTravelModel>(
    "usuarios_viagens",
    {
      id_usuario_viagem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        references: {
          model: "USUARIOS",
          key: "id_usuario",
        },
        allowNull: false,
      },
      id_viagem: {
        type: DataTypes.INTEGER,
        references: {
          model: "VIAGENS",
          key: "id_usuario",
        },
        allowNull: false,
      },
    },
    {
      tableName: "USUARIOS_VIAGENS",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_usuario_viagem" }],
        },
      ],
    }
  );
}
