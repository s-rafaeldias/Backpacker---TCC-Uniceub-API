import cfg from "../config/db.config.js";
import UserModel from "./user";
import TravelModel from "./travel";
import UserTravelModel from "./user_travel"
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
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
export const Travel = TravelModel(sequelize);
export const UserTravel = UserTravelModel(sequelize);

export default sequelize;
