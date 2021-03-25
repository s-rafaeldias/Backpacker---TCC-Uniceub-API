const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Backpacker application." });
});

require("./app/routes/turorial.routes")(app);


var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
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

