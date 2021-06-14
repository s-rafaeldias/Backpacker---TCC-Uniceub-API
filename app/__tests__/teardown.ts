import admin from "firebase-admin";
import { sequelize } from '../models';

module.exports = async () => {
  sequelize.close()
    .then(() => console.log("DB is off"));

  admin
    .app()
    .delete()
    .then(() => console.log("App is off"));
};
