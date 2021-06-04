import db from "./app/models";
import { seedDatabase } from "./app/models/utils";
import app from "./app/app";


if (process.env.ENV === "DEV") {
  db.sync({ force: true }).then(() => {
    seedDatabase();
  });
} else {
  console.log("Creating DB...");
  db.sync({ alter: true });
}

if (process.env.FULL_RESET) { 
  db.sync({ force: true });
}

if (process.env.DB_PORT) {
  console.log("PORT:", process.env.DB_PORT);
}


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
