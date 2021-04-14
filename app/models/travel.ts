import { Sequelize, Optional, Model, DataTypes } from "sequelize";
import { User } from './user';
//import UserModel from "./user";

export interface TravelAttributes {
  id_viagem: number;
  nome_viagem: string;
  orcamento_viagem?: number;
  dt_inicio: Date;
  dt_fim: Date;
  descricao: string;
  id_usuario: number; //Usuario dono da viagem
}

export interface TravelCreationAttributes
  extends Optional<
  TravelAttributes,
    "id_viagem"
  | "orcamento_viagem"
  | "dt_inicio"
  | "dt_fim"
  | "descricao"
  > { }

class Travel extends Model<TravelAttributes, TravelCreationAttributes>
  implements TravelAttributes {
  public id_viagem!: number;
  public nome_viagem!: string;
  public orcamento_viagem!: number;
  public dt_inicio!: Date;
  public dt_fim!: Date;
  public descricao!: string;
  public id_usuario!: number;

}

export default function (sequelize: Sequelize) {
  return sequelize.define<Travel>(
    "viagem",
    {
      id_viagem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_viagem: {
        type: DataTypes.CHAR(20),
        allowNull: false,
      },
      orcamento_viagem: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dt_inicio: {
        type: "TIMESTAMP",
        allowNull: true,
      },
      dt_fim: {
        type: "TIMESTAMP",
        allowNull: true,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        references: {
          model: 'USUARIOS',
          key: 'id_usuario',
        },
        allowNull: false,
      },
    },
    {
      tableName: "VIAGENS",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_viagem" }],
        },
      ],
    }
  );
}
