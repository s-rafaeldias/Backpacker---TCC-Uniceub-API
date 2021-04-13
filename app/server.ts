import admin from "firebase-admin";
import firebaseConfig from "./config/firebase.js";
import express from "express";
import cors from "cors";
import db from './models';

const app = express();

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: configurar isso para usar variavel de ambiente,
// dependendo do ambiente (DEV ou PROD)
db.sync({ force: true })

import { routingMiddleWare } from "./routes/index";
routingMiddleWare(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
