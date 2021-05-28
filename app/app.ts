import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./config/firebase";
import express from "express";
import cors from "cors";
import { routingMiddleWare } from "./routes/index";

const app = express();

if (!admin.apps.length) {
  if (process.env.ENV === "DEV") {
    admin.initializeApp({ projectId: "tcc-backpacker" });
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().useEmulator("http://localhost:9099/");
      console.log("Firebase is on!");
    }
  } else {
    admin.initializeApp(firebaseConfig);
  }
}

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routingMiddleWare(app);

export default app;
