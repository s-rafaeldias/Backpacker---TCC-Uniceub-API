import { Sequelize, Optional, Model, DataTypes } from "sequelize";

export interface SpotAttributes {
  id_local: number;
  nome_local: string;
  dt_planejada?: Date;
  visitado: boolean;
  ts_visitado?: Date;
  descricao_local?: string;
  id_viagem: number; //Viagem a qual o lugar pertence
}

export interface SpotCreationAttributes
  extends Optional<
    SpotAttributes,
    "id_local" | "nome_local" | "dt_planejada" | "visitado" | "ts_visitado" | "descricao_local" | "id_viagem"
  > {}

export class SpotModel
  extends Model<SpotAttributes, SpotCreationAttributes>
  implements SpotAttributes {
  public id_local!: number;
  public nome_local!: string;
  public dt_planejada!: Date;
  public visitado!: boolean;
  public ts_visitado!: Date;
  public descricao_local!: string;
  public id_viagem!: number;
}

export default function(sequelize: Sequelize) {
  return sequelize.define<SpotModel>(
    "local",
    {
      id_local: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_local: {
        type: DataTypes.CHAR(20),
        allowNull: false,
      },
      dt_planejada: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      visitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ts_visitado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      descricao_local: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_viagem: {
        type: DataTypes.INTEGER,
        references: {
          model: "VIAGENS",
          key: "id_viagem",
        },
        allowNull: false,
      },
    },
    {
      tableName: "LOCAIS",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_local" }],
        },
      ],
    }
  );
}
