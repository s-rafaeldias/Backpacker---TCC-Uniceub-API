import { Request } from "express";
import { convertTimeStampToDate } from "../helper/convertDate";

import { User } from "../models/index";
import { UserCreationAttributes } from "../models/user";


export async function createUser(req: Request) {
  let user: UserCreationAttributes = {
    email: req.body.email as string,
    nome_usuario: req.body.nome,
    dt_nascimento: convertTimeStampToDate(req.body.dt_nascimento),
    id_firebase: req.body.id_firebase,
  };

  return await User.create(user);
}

export async function updateUser(id_firebase: string, payload) {
  if (payload.dt_nascimento !== undefined) {
    payload.dt_nascimento = convertTimeStampToDate(payload.dt_nascimento);
  }

  return await User.update(payload, { where: { id_firebase } });
}

export async function getUser(id_firebase: string) {
  return await User.findOne({ where: { id_firebase } });
}

export async function deleteUser(id_firebase: string, softDelete: boolean) {
  if (softDelete) {
    await User.update({ conta_ativa: false }, { where: { id_firebase } });
  } else {
    await User.destroy({ where: { id_firebase } });
  }
}