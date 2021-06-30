import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";

import { firebaseAdmin, firebaseApp } from "./config/firebase";
import express from "express";
import cors from "cors";
import { routingMiddleWare } from "./routes/index";

const app = express();

process.env.GOOGLE_APPLICATION_CREDENTIALS="tcc-backpacker-firebase-adminsdk-vcyrz-d27443b088.json"

if (process.env.ENV === "DEV" || process.env.ENV === "TEST") {
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: "tcc-backpacker" });
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseApp);
    firebase.auth().useEmulator("http://localhost:9099/");
    console.log("Firebase is on!");
  }
} else {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
  firebase.initializeApp(firebaseApp);
  console.log("Firebase is on in PROD MODE!");
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
