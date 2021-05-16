import { Sequelize, Optional, Model, DataTypes } from "sequelize";

export interface DocumentAttributes {
  id_documento: number;
  id_viagem: number;
  id_categoria_documento: number;
  nome_documento: string;
  imagem_path: string;
}

export interface DocumentCreationAttributes
  extends Optional<
    DocumentAttributes,
    "id_documento" | "id_viagem" | "nome_documento" | "imagem_path" | "id_categoria_documento"
  > {}

export class DocumentModel extends Model<DocumentAttributes>
  implements DocumentAttributes {
  public id_documento!: number;
  public id_viagem!: number;
  public id_categoria_documento!: number;
  public nome_documento!: string;
  public imagem_path!: string;

}

export default function(sequelize: Sequelize) {
  return sequelize.define<DocumentModel>(
    "documentos",
    {
      id_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_viagem: {
        type: DataTypes.INTEGER,
        references: {
          model: "VIAGENS",
          key: "id_viagem",
        },
        allowNull: false,
      },
      id_categoria_documento: {
        type: DataTypes.INTEGER,
        references: {
          model: "CATEGORIA_DOCUMENTO",
          key: "id_categoria_documento",
        },
        allowNull: false,
      },         
      nome_documento: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imagem_path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "DOCUMENTOS",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_documento" }],
        },
      ],
    }
  );
}
