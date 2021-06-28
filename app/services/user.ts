// import { Request } from "express";
import admin from "firebase-admin";

import { convertTimeStampToDate } from "../helper/convertDate";
import { User } from "../models/index";
import { UserCreationAttributes  } from "../models/user";

export async function createUser(userData: UserCreationAttributes) {
  let firebaseUser = await admin.auth().createUser({
    email: userData.email,
    password: userData.senha,
    displayName: userData.nome_usuario,
  });

  userData.dt_nascimento = convertTimeStampToDate(userData.dt_nascimento);
  userData.id_firebase = firebaseUser.uid;

  try {
    let user = await User.create(userData);
    return user;
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      await admin.auth().deleteUser(firebaseUser.uid);
    }
    throw err;
  };
}

export async function updateUser(id_firebase: string, payload) {
  if (payload.dt_nascimento !== undefined) {
    payload.dt_nascimento = convertTimeStampToDate(payload.dt_nascimento);
  }

  let user = await User.findOne({ where: { id_firebase } });
  if (user) {
    if (payload.email) {
      await admin.auth().updateUser(user.id_firebase, { email: payload.email })
    }

    if (payload.senha) {
      await admin.auth().updateUser(user.id_firebase, { password: payload.senha });
    }

    user.set(payload);
    return await user.save();
  }
  return;
}

export async function getUser(id_firebase: string) {
  return await User.findOne({ where: { id_firebase } });
}

export async function deleteUser(id_firebase: string, softDelete: boolean) {
  if (softDelete) {
    await User.update({ conta_ativa: false }, { where: { id_firebase } });
  } else {
    await User.destroy({ where: { id_firebase } });
    await admin.auth().deleteUser(id_firebase);
  }
}

export async function getUserFromToken(token: string) {
  const firebaseData = await admin.auth().verifyIdToken(token);
  const firebaseID = firebaseData.uid;
  return await getUser(firebaseID);
}
