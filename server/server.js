import firebase from "@firebase/app";
import "@firebase/auth";
import firebaseConfig from './app/config/firebase.js'
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// console.log(firebase);
firebase.default.initializeApp(firebaseConfig);

var corsOptions = {
  origin: "http://localhost:8081"
};  

app.use(cors(corsOptions));

import db from "./app/models/index.js";
db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { routingMiddleWare} from "./app/routes/index.js";
// console.log(routes);
routingMiddleWare(app)

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});