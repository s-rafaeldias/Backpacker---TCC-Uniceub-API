import Sequelize from 'sequelize';
export default function (sequelize, DataTypes) {
	return sequelize.define('usuario', {
		ID_USUARIO: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		EMAIL: {
			type: DataTypes.CHAR(50),
			allowNull: false
		},
		ESTADO_CONTA: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		NOME_USUARIO: {
			type: DataTypes.CHAR(50),
			allowNull: true
		},
		SEXO: {
			type: DataTypes.CHAR(1),
			allowNull: true
		},
		DT_NASCIMENTO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		FB_ID: {
			type: DataTypes.CHAR(50),
			allowNull: false
		},
		TS_ULTIMO_LOGIN: {
			type: DataTypes.DATE,
			allowNull: true
		},
		TS_CADASTRO: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW
		},
		TS_ALTERACAO_PERFIL: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		}
	}, {
		sequelize,
		tableName: 'usuario',
		timestamps: false,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
					{ name: "ID_USUARIO" },
				]
			},
		]
	});
};
