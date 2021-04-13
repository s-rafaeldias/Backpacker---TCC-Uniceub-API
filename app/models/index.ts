import cfg from "../config/db.config.js";
import UserModel from "./user";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
  host: cfg.HOST,
  dialect: cfg.dialect,

  pool: {
    max: cfg.pool.max,
    min: cfg.pool.min,
    acquire: cfg.pool.acquire,
    idle: cfg.pool.idle,
  },
});

export const User = UserModel(sequelize);

export default sequelize;
