import firebase from "@firebase/app";
import * as admin from 'firebase-admin';
import firebaseConfig from '../config/firebase.js'
import "@firebase/auth";

process.env.GOOGLE_APPLICATION_CREDENTIALS = ''
admin.default.initializeApp(firebaseConfig);

const auth = async (req,res,next) => {
    try {
        //teste
        // let user = await admin
        //     .default
        //     .auth()
        //     .createCustomToken('CCYpQPh1GOYGGziTq44zIpKKZyB3')
        // console.log(user);
        // let user = await admin.default.auth().getUser('CCYpQPh1GOYGGziTq44zIpKKZyB3')
        // console.log(user)
        let decodedToken = await admin.default.auth().verifyIdToken(idToken)
        console.log(decodedToken);
        
    } catch (error) {
        console.log(error);
    }

    if('email' in req.body){
        next()
    }else{
        res.status(500).json({'msg':'asdd'})
    }
};

export { auth }
