import Sequelize from "sequelize";
export default function(sequelize, DataTypes) {
	return sequelize.define(
		"usuario",
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
			estado_conta: {
				type: DataTypes.CHAR(1),
				allowNull: false,
				defaultValue: false,
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
			},
			ts_cadastro: {
				type: "DATETIME DEFAULT CURRENT_TIMESTAMP",
			},
			ts_alteracao_perfil: {
				type: "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
				// allowNull: false,
			},
			conta_ativa: {
				type: DataTypes.CHAR(1),
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			tableName: "USUARIO",
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
