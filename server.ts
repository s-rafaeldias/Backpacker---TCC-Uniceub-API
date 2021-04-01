import firebase from "firebase";
import firebaseConfig from './app/config/firebase.js';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var corsOptions = {
  origin: "http://localhost:8081"
};  

app.use(cors(corsOptions));

import db from "./app/models/index.js";
db.sequelize.sync();

app.use(bodyParser.json());
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



const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*admin
  .auth()
  .createUser({
    uid: 'tbadaro',
    email: 'tbadaro@sempreceub.com',
    phoneNumber: '+112341237890',
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });*/


