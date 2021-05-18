import admin from "firebase-admin";
import firebaseConfig from "./app/config/firebase";

import db from "./app/models";
import { seedDatabase } from "./app/models/utils";
import app from "./app/app";


if (process.env.ENV === "DEV") {
  db.sync({ force: true }).then(() => {
    seedDatabase();
  });

  if (!admin.apps.length) {
    admin.initializeApp({ projectId: "tcc-backpacker" });
  }
} else {
  console.log("Creating DB...");
  db.sync({ alter: true });

  if (!admin.apps.length) {
    admin.initializeApp(firebaseConfig);
  }
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
