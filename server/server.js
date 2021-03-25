import firebase from "@firebase/app";
import _ from "@firebase/auth";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// console.log(firebase);
// firebase.default.initializeApp(firebaseConfig);

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


var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

// set port, listen for requests
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

const actionCodeSettings = {
   // URL you want to redirect back to. The domain (www.example.com) for
   // this URL must be whitelisted in the Firebase Console.
   url: 'https://www.example.com/checkout?cartId=1234',
   // This must be true for email link sign-in.
   handleCodeInApp: true,
   iOS: {
     bundleId: 'com.example.ios',
   },
   android: {
     packageName: 'com.example.android',
     installApp: true,
     minimumVersion: '12',
   },
   // FDL custom domain.
   dynamicLinkDomain: 'coolapp.page.link',
 };
  

/*  // Admin SDK API to generate the password reset link.
const email = 'tbadaro@sempreceub.com';
admin
  .auth()
  .generatePasswordResetLink(email, actionCodeSettings)
  .then((link) => {
    // Construct password reset email template, embed the link and send
    // using custom SMTP server.
    return sendCustomPasswordResetEmail(email, displayName, link);
  })
  .catch((error) => {
    // Some error occurred.
  });*/

