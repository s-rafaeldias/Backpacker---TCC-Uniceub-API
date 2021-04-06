import firebase from "@firebase/app";
import "@firebase/auth";
import firebaseConfig from "./config/firebase.js";
import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// console.log(firebase);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

import db from "./models/index.js";
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { routingMiddleWare } from "./routes/index.js";
routingMiddleWare(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
