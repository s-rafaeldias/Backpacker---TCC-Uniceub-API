import { Request } from "express";
import { convertTimeStampToDate } from "../helper/convertDate";

import { Travel, User } from "../models/index";
import { TravelCreationAttributes } from "../models/travel";
import { getUserFromToken } from '../services/user';


export async function createTravel(req: Request) {
  let travelData: TravelCreationAttributes = {
    nome_viagem: req.body.nome_viagem,
    dt_inicio: convertTimeStampToDate(req.body.dt_inicio),
    dt_fim: convertTimeStampToDate(req.body.dt_fim),
    id_usuario: req.body.id_usuario,
  };
  let travel = await Travel.create(travelData);

  // Pegar usario com base no id_firebase
  // let token = req.headers.authorization || "sdfgsdf";

  // let user = await getUserFromToken(token);
  let user = await User.findByPk(1);
  if (user) {
    return await user.addTravel(travel);
  }

  return;
}

export async function updateTravel(id_viagem: string, payload) {
  if (payload.dt_inicio !== undefined) {
    payload.dt_inicio = convertTimeStampToDate(payload.dt_inicio);
  }
  if (payload.dt_fim !== undefined) {
    payload.dt_fim = convertTimeStampToDate(payload.dt_fim);
  }

  return await Travel.update(payload, { where: { id_viagem } });
}

export async function getTravel(id_viagem: string) {
  return await Travel.findOne({ where: { id_viagem } });
}

export async function getAllTravel(id_usuario: string) {
  return await Travel.findAll({ where: { id_usuario } });
}

export async function deleteTravel(id_viagem: string) {
    await Travel.destroy({ where: { id_viagem } });
}
