import cfg from "../config/db.config.js";
import usuario from './usuario.js'
import Sequelize from "sequelize";

const sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
  host: cfg.HOST,
  dialect: cfg.dialect,
  operatorsAliases: false,

  pool: {
    max: cfg.pool.max,
    min: cfg.pool.min,
    acquire: cfg.pool.acquire,
    idle: cfg.pool.idle
  }
});

const db = {};
usuario(sequelize, Sequelize)

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// console.log(db.sequelize.models);
// models = {}

// console.log(Object.getOwnPropertyNames(db.usuario))
export default db;

