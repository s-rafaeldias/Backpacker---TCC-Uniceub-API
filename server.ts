import admin from "firebase-admin";
import firebaseConfig from "./app/config/firebase";

import db from "./app/models";
import app from './app/app';

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

if (process.env.ENV === "TEST") {
  // await db.sync({ force: true });
} else {
  console.log("Creating DB...");
  db.sync({ force: true });
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
