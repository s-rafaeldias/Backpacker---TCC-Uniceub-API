import { Sequelize, Optional, Model, DataTypes } from "sequelize";

export interface DocumentCategoryAttributes {
  id_categoria_documento: number;
  nome_categoria: string;
}

export interface DocumentCategoryCreationAttributes
  extends Optional<
    DocumentCategoryAttributes,
    "id_categoria_documento" | "nome_categoria"
  > {}

export class DocumentCategoryModel extends Model<DocumentCategoryAttributes, DocumentCategoryCreationAttributes>
  implements DocumentCategoryAttributes {
  public id_categoria_documento!: number;
  public nome_categoria!: string;

}

export default function(sequelize: Sequelize) {
  return sequelize.define<DocumentCategoryModel>(
    "categoria_documento",
    {
      id_categoria_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    
      nome_categoria: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "CATEGORIA_DOCUMENTO",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_categoria_documento" }],
        },
      ],
    }
  );
}
