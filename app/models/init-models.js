var DataTypes = require("sequelize").DataTypes;
var _categoria_documento = require("./categoria_documento");
var _documento = require("./documento");
var _documento_viagem = require("./documento_viagem");
var _gasto = require("./gasto");
var _local = require("./local");
var _local_viagem = require("./local_viagem");
var _tipo_usuario = require("./tipo_usuario");
var _usuario = require("./user");
var _usuario_viagem = require("./usuario_viagem");
var _viagem = require("./travel");
var _viagem_gasto = require("./viagem_gasto");
var _viagem_usuario = require("./viagem_usuario");
var _viagens_do_usuario = require("./viagens_do_usuario");

function initModels(sequelize) {
  var categoria_documento = _categoria_documento(sequelize, DataTypes);
  var documento = _documento(sequelize, DataTypes);
  var documento_viagem = _documento_viagem(sequelize, DataTypes);
  var gasto = _gasto(sequelize, DataTypes);
  var local = _local(sequelize, DataTypes);
  var local_viagem = _local_viagem(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var usuario = _usuario(sequelize);
  var usuario_viagem = _usuario_viagem(sequelize, DataTypes);
  var viagem = _viagem(sequelize, DataTypes);
  var viagem_gasto = _viagem_gasto(sequelize, DataTypes);
  var viagem_usuario = _viagem_usuario(sequelize, DataTypes);
  var viagens_do_usuario = _viagens_do_usuario(sequelize, DataTypes);

  tipo_usuario.belongsToMany(viagens_do_usuario, { as: 'ID_USUARIO_viagens_do_usuarios', through: usuario_viagem, foreignKey: "CD_TIPO", otherKey: "ID_USUARIO" });
  usuario.belongsToMany(viagem, { as: 'ID_VIAGEM_viagems', through: viagens_do_usuario, foreignKey: "ID_USUARIO", otherKey: "ID_VIAGEM" });
  viagem.belongsToMany(usuario, { as: 'ID_USUARIO_usuarios', through: viagens_do_usuario, foreignKey: "ID_VIAGEM", otherKey: "ID_USUARIO" });
  viagens_do_usuario.belongsToMany(tipo_usuario, { as: 'CD_TIPO_tipo_usuarios', through: usuario_viagem, foreignKey: "ID_USUARIO", otherKey: "CD_TIPO" });
  viagens_do_usuario.belongsToMany(tipo_usuario, { as: 'CD_TIPO_tipo_usuarios', through: usuario_viagem, foreignKey: "ID_VIAGEM", otherKey: "CD_TIPO" });
  usuario_viagem.belongsTo(tipo_usuario, { as: "CD_TIPO_tipo_usuario", foreignKey: "CD_TIPO"});
  tipo_usuario.hasMany(usuario_viagem, { as: "usuario_viagems", foreignKey: "CD_TIPO"});
  viagens_do_usuario.belongsTo(tipo_usuario, { as: "CD_TIPO_tipo_usuario", foreignKey: "CD_TIPO"});
  tipo_usuario.hasMany(viagens_do_usuario, { as: "viagens_do_usuarios", foreignKey: "CD_TIPO"});
  viagem_usuario.belongsTo(usuario, { as: "ID_USUARIO_usuario", foreignKey: "ID_USUARIO"});
  usuario.hasMany(viagem_usuario, { as: "viagem_usuarios", foreignKey: "ID_USUARIO"});
  viagens_do_usuario.belongsTo(usuario, { as: "ID_USUARIO_usuario", foreignKey: "ID_USUARIO"});
  usuario.hasMany(viagens_do_usuario, { as: "viagens_do_usuarios", foreignKey: "ID_USUARIO"});
  viagens_do_usuario.belongsTo(viagem, { as: "ID_VIAGEM_viagem", foreignKey: "ID_VIAGEM"});
  viagem.hasMany(viagens_do_usuario, { as: "viagens_do_usuarios", foreignKey: "ID_VIAGEM"});
  usuario_viagem.belongsTo(viagens_do_usuario, { as: "ID_USUARIO_viagens_do_usuario", foreignKey: "ID_USUARIO"});
  viagens_do_usuario.hasMany(usuario_viagem, { as: "usuario_viagems", foreignKey: "ID_USUARIO"});
  usuario_viagem.belongsTo(viagens_do_usuario, { as: "ID_VIAGEM_viagens_do_usuario", foreignKey: "ID_VIAGEM"});
  viagens_do_usuario.hasMany(usuario_viagem, { as: "ID_VIAGEM_usuario_viagems", foreignKey: "ID_VIAGEM"});

  return {
    categoria_documento,
    documento,
    documento_viagem,
    gasto,
    local,
    local_viagem,
    tipo_usuario,
    usuario,
    usuario_viagem,
    viagem,
    viagem_gasto,
    viagem_usuario,
    viagens_do_usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
