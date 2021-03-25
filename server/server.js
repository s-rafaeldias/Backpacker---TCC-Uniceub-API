import firebase from "@firebase/app";
import _ from "@firebase/auth";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const firebaseConfig = {
    apiKey: "AIzaSyAEL_IA19Wg9EP8jG2jGWcGBpo5lmBAPkE",
    authDomain: "backpack-f8005.firebaseapp.com",
    projectId: "backpack-f8005",
    storageBucket: "backpack-f8005.appspot.com",
    messagingSenderId: "373618913012",
    appId: "1:373618913012:web:bc075828517644515d78a1",
    measurementId: "G-JKL97MNDQH"
};
// console.log(firebase);
firebase.default.initializeApp(firebaseConfig);

var corsOptions = {
  origin: "http://localhost:8081"
};  

app.use(cors(corsOptions));

import db from "./app/models/index.js";
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//     firebase.auth().createUserWithEmailAndPassword('filipe.fontes1212@gmail.com', '123123')
//         .then((userCredential) => {
//             // Signed in
//             console.log(userCredential)
//             var user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // ..
//     });

//   res.json({ message: "Welcome to Backpacker application." });
// });

import { routingMiddleWare} from "./app/routes/index.js";
// console.log(routes);
routingMiddleWare(app)

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

