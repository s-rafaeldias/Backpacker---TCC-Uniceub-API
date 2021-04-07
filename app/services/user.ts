import { Request } from "express";
import { convertTimeStampToDate } from "../helper/convertDate";

import { User } from "../models/index";
import { UserAttributes } from "../models/usuario";

// import db from '../models/index';

export async function createUser(req: Request) {
  let user: UserAttributes = {
    email: req.body.email as string,
    estado_conta: false,
    nome_usuario: req.body.nome,
    dt_nascimento: convertTimeStampToDate(req.body.dt_nascimento),
    id_firebase: req.body.firebase_id,
    ts_cadastro: new Date(),
    ts_alteracao_perfil: new Date(),
    conta_ativa: true,
  };

  return await User.create(user);
}

export async function updateUser(id_firebase, payload) {
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
