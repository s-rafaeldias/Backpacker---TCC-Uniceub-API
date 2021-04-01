import firebase from "@firebase/app";
import * as admin from 'firebase-admin';
import firebaseConfig from '../config/firebase.js'
import db from "../models/index.js";
import usuario from "../models/usuario.js";
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
            let verificaEmail = async emailVerified => await db
                .sequelize.models
                .usuario
                .update({estado_conta: true},{where:{email: emailVerified}});
            verificaEmail (emailVerified);
            next();
        }

        res.status(401).json({'msg': 'Email nao verificado'});
    } catch (error) {
        console.log(error);
        res.status(401).json({'msg': 'Token invalido'});
    }
};

export { auth }