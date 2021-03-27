import firebase from "@firebase/app";
import * as admin from 'firebase-admin';
import firebaseConfig from '../config/firebase.js'
// import "@firebase/auth";
// import "firebase";

process.env.GOOGLE_APPLICATION_CREDENTIALS = ''
admin.default.initializeApp(firebaseConfig);

const auth = async (req, res, next) => {
    try {
        let token = await admin
            .auth()
            .verifyIdToken(req.body.token);

        let userID = token.uid;
        let emailVerified = token.email_verified

        if (emailVerified) {
            // TODO: fazer paranaue no banco de marcar email como verificado
            next();
        }

        res.status(401).json({'msg': 'Email nao verificado'});
    } catch (error) {
        console.log(error);
        res.status(401).json({'msg': 'Token invalido'});
    }
};

export { auth }
