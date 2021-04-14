import { Sequelize, Optional, Model, DataTypes } from "sequelize";

export interface UserAttributes {
  id_usuario: number;
  email: string;
  email_verificado: boolean;
  nome_usuario?: string;
  sexo?: string;
  dt_nascimento: Date;
  id_firebase: string;
  conta_ativa: boolean;

  // Timestamps
  ts_ultimo_login: Date;
  ts_cadastro: Date;
  ts_alteracao_perfil: Date;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id_usuario"
    | "email_verificado"
    | "conta_ativa"
    | "nome_usuario"
    | "sexo"
    | "ts_ultimo_login"
    | "ts_cadastro"
    | "ts_alteracao_perfil"
  > {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id_usuario!: number;
  public email!: string;
  public email_verificado!: boolean;
  public nome_usuario!: string;
  public sexo!: string;
  public dt_nascimento!: Date;
  public id_firebase!: string;
  public conta_ativa!: boolean;

  // Timestamps
  public ts_ultimo_login!: Date;
  public ts_cadastro!: Date;
  public ts_alteracao_perfil!: Date;

  public ownsTravel(): boolean {
    return true;
  }

  public async setEmailAsVerified() {
    this.email_verificado = true;
    await this.save();
  }
}

export default function(sequelize: Sequelize) {
  return sequelize.define<UserModel>(
    "USUARIOS",
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        unique: true,
      },
      email_verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      conta_ativa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      nome_usuario: {
        type: DataTypes.CHAR(50),
        allowNull: true,
      },
      sexo: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      dt_nascimento: {
        type: "TIMESTAMP",
        allowNull: true,
      },
      id_firebase: {
        type: DataTypes.CHAR(100),
        unique: true,
        allowNull: false,
      },
      ts_ultimo_login: {
        type: "DATETIME DEFAULT CURRENT_TIMESTAMP",
        defaultValue: new Date(),
      },
      ts_cadastro: {
        type: "DATETIME DEFAULT CURRENT_TIMESTAMP",
        defaultValue: new Date(),
      },
      ts_alteracao_perfil: {
        type: "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      },
    },
    {
      tableName: "USUARIOS",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_usuario" }],
        },
      ],
    }
  );
}
