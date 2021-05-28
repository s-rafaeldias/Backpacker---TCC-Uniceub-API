import { sequelize } from "../models";

export default async () => {
  sequelize.close().then(() => {
    console.log("Closed connection with DB");
  });
};
