import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./config/firebase";
import express from "express";
import cors from "cors";
import { routingMiddleWare } from "./routes/index";

const app = express();

if (process.env.ENV === "DEV" || process.env.ENV === "TEST") {
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: "tcc-backpacker" });
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().useEmulator("http://localhost:9099/");
    console.log("Firebase is on!");
  }
} else {
  if (!admin.apps.length) {
    admin.initializeApp(firebaseConfig);
  }
}

if (process.env.DB_PORT) {
  console.log("PORT:", process.env.DB_PORT);
}

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routingMiddleWare(app);

export default app;
