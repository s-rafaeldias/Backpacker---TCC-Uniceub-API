import { Sequelize, Optional, Model, DataTypes } from "sequelize";

export interface ExpenseAttributes {
  id_gasto: number;
  nome_gasto: string;
  dt_gasto: Date;
  descricao_gasto?: string;
  valor_gasto: number;
  link_imagem_gasto?: string;
  id_viagem: number; //Viagem a qual o lugar pertence
}

export interface ExpenseCreationAttributes
  extends Optional<
  ExpenseAttributes,
    "id_gasto" | "nome_gasto" | "dt_gasto" | "descricao_gasto" | "valor_gasto" | "link_imagem_gasto" | "id_viagem"
  > {}

export class ExpenseModel
  extends Model<ExpenseAttributes, ExpenseCreationAttributes>
  implements ExpenseAttributes {
  public id_gasto!: number;
  public nome_gasto!: string;
  public dt_gasto!: Date;
  public descricao_gasto!: string;
  public valor_gasto!: number;
  public link_imagem_gasto!: string;
  public id_viagem!: number;
  
}

export default function(sequelize: Sequelize) {
  return sequelize.define<ExpenseModel>(
    "gasto",
    {
      id_gasto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_gasto: {
        type: DataTypes.CHAR(20),
        allowNull: true,
      },
      dt_gasto: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      descricao_gasto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      valor_gasto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
        link_imagem_gasto: {
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
      tableName: "GASTOS",
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