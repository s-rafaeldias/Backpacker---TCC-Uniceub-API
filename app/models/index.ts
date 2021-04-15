import cfg from "../config/db.config.js";
import UserModel from "./user";
import TravelModel from "./travel";
import UserTravelModel from "./user_travel";
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

const User = UserModel(sequelize);
const Travel = TravelModel(sequelize);
const UserTravel = UserTravelModel(sequelize);

User.belongsToMany(Travel, {
  through: UserTravel,
  as: "Travel",
  foreignKey: "id_usuario",
  otherKey: "id_viagem",
});

Travel.belongsToMany(User, {
  through: UserTravel,
  as: "User",
  foreignKey: "id_viagem",
  otherKey: "id_usuario",
});

export { User, Travel, UserTravel };
export default sequelize;
