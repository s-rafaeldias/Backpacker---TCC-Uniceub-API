import cfg from "../config/db.config.js";
import UserModel from "./usuario";
import { Sequelize, Dialect } from "sequelize";

const sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
  host: cfg.HOST,
  dialect: "mysql",

  pool: {
    max: cfg.pool.max,
    min: cfg.pool.min,
    acquire: cfg.pool.acquire,
    idle: cfg.pool.idle,
  },
});

const db = {};

export const User = UserModel(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// console.log(db.sequelize.models);
// models = {}

// console.log(Object.getOwnPropertyNames(db.usuario))
export default db;
