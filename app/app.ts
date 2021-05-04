import admin from "firebase-admin";
import firebaseConfig from "./config/firebase";
import express from "express";
import cors from "cors";
import { routingMiddleWare } from "./routes/index";

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

routingMiddleWare(app);

export default app;
