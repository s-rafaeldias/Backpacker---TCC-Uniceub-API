import cfg from "../config/db.config";
import UserModel from "./user";
import TravelModel from "./travel";
import UserTravelModel from "./user_travel";
import SpotModel from "./spot";
import DocumentModel from "./document";
import DocumentCategoryModel from "./document_category";
import ExpenseModel from "./expense";
import { Sequelize } from "sequelize";

export let sequelize: Sequelize;

if (!process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(cfg.DB, cfg.USER, cfg.PASSWORD, {
    host: cfg.HOST,
    dialect: "mysql",
    logging: true,
    port: cfg.port,

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

const User = UserModel(sequelize);
const Travel = TravelModel(sequelize);
const UserTravel = UserTravelModel(sequelize);
const Spot = SpotModel(sequelize);
const DocumentCategory = DocumentCategoryModel(sequelize);
const Document = DocumentModel(sequelize);
const Expense = ExpenseModel(sequelize);

User.belongsToMany(Travel, {
  through: UserTravel,
  as: "travels",
  onDelete: "CASCADE",
  foreignKey: { name: "id_usuario" },
});
Travel.belongsToMany(User, {
  through: UserTravel,
  as: "users",
  onDelete: "CASCADE",
  foreignKey: { name: "id_viagem" },
});

Travel.hasMany(Spot, {
  as: "spots",
  onDelete: "CASCADE",
  foreignKey: "id_viagem",
  sourceKey: "id_viagem",
});
Spot.belongsTo(Travel, {
  as: "travel",
  foreignKey: "id_viagem",
  targetKey: "id_viagem",
});

Travel.hasMany(Expense, {
  as: "expenses",
  onDelete: "CASCADE",
  foreignKey: "id_viagem",
  sourceKey: "id_viagem",
});
Expense.belongsTo(Travel, {
  foreignKey: "id_viagem",
  targetKey: "id_viagem",
});

Travel.hasMany(Document, {
  as: "Document",
  onDelete: "CASCADE",
});

Document.belongsTo(Travel, {
  as: "Travel",
  onDelete: "CASCADE",
  foreignKey: "id_viagem",
});

DocumentCategory.hasMany(Document, {
  as: "Document",
  onDelete: "CASCADE",
});

Document.belongsTo(DocumentCategory, {
  as: "DocumentCategory",
  onDelete: "CASCADE",
  foreignKey: "id_categoria_documento",
});

export { User, Travel, UserTravel, Spot, Expense, Document, DocumentCategory };
export default sequelize;
