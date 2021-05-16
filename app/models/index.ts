import cfg from "../config/db.config";
import UserModel from "./user";
import TravelModel from "./travel";
import UserTravelModel from "./user_travel";
import SpotModel from "./spot";
import DocumentModel from "./document";
import DocumentCategoryModel from "./document_category"
import { Sequelize } from "sequelize";

export let sequelize: Sequelize;

if (!process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
    host: cfg.HOST,
    dialect: "mysql",
    logging: process.env.ENV === "TEST",

    pool: {
      max: cfg.pool.max,
      min: cfg.pool.min,
      acquire: cfg.pool.acquire,
      idle: cfg.pool.idle,
    },
  });
} else {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL!);
}
// export const sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
    // host: cfg.HOST,
    // dialect: "mysql",
    // logging: process.env.ENV === "TEST",

    // pool: {
      // max: cfg.pool.max,
      // min: cfg.pool.min,
      // acquire: cfg.pool.acquire,
      // idle: cfg.pool.idle,
    // },
  // });

const User = UserModel(sequelize);
const Travel = TravelModel(sequelize);
const UserTravel = UserTravelModel(sequelize);
const Spot = SpotModel(sequelize);
const DocumentCategory = DocumentCategoryModel(sequelize)
const Document = DocumentModel(sequelize);
User.belongsToMany(Travel, {
  through: UserTravel,
  as: "Travel",
  onDelete: "CASCADE",
  foreignKey: "id_usuario",
  otherKey: "id_viagem",
});

Travel.belongsToMany(User, {
  through: UserTravel,
  as: "User",
  onDelete: "CASCADE",
  foreignKey: "id_viagem",
  otherKey: "id_usuario",
});

Travel.hasMany(Spot, {
  as: "Spot",
  onDelete: "CASCADE",
});

Spot.belongsTo(Travel, {
  as: "Travel",
  onDelete: "CASCADE",
  foreignKey: "id_viagem",
});

Document.belongsTo(DocumentCategory,{
  as: "categoria_documento",
  onDelete: "CASCADE",
  foreignKey: "id_categoria_documento",
})

Document.belongsTo(Travel,{
  as: "Travel",
  onDelete: "CASCADE",
  foreignKey: "id_viagem",
})


export { User, Travel, UserTravel, Spot };
export default sequelize;
