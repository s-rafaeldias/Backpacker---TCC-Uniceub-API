import * as admin from "firebase-admin";

import { getUser } from "../services/user";

import { Request, Response, NextFunction } from "express";

process.env.GOOGLE_APPLICATION_CREDENTIALS = "";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization || "";

    let firebaseVerification = await admin.auth().verifyIdToken(token);
    let emailVerified = firebaseVerification.email_verified;

    let userID = firebaseVerification.uid;
    let user = await getUser(userID);

    if (user) {
      if (emailVerified && user.email_verificado !== emailVerified) {
        await user.setEmailAsVerified();
      }
    }

    next();
    return;
  } catch (err) {
    console.log(err);

    res.status(401).json({
      message: "Token invalido",
      error: err,
    });
  }
};

export const userAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization || "";

  let firebaseVerification = await admin.auth().verifyIdToken(token);
  let idFirebase = req.params.id_firebase;

  if (idFirebase !== firebaseVerification.uid) {
    res.status(401).json({
      error: "Ação proibida",
      message: "Usuário sem permissão para realizar ação",
    });
    return;
  }

  next();
  return;
}
