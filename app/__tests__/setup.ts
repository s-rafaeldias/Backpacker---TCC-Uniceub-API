import { seedDatabase } from '../models/utils';
import { sequelize } from '../models';
import admin from "firebase-admin";

export default async () => {
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: "tcc-backpacker" });
  }

  await sequelize.sync({ force: true });
  await seedDatabase();
}
