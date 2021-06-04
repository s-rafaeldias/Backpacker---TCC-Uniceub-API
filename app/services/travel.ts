import { Request } from "express";
import { convertTimeStampToDate } from "../helper/convertDate";

import { Travel, User } from "../models/index";
import { TravelCreationAttributes } from "../models/travel";
import { getUserFromToken } from "../services/user";
import { ValidationError } from "sequelize";

export async function createTravel(req: Request) {
  let travelData: TravelCreationAttributes = {
    nome_viagem: req.body.nome_viagem,
    descricao: req.body.descricao,
    orcamento_viagem: req.body.orcamento_viagem,
  };

  if (req.body.dt_inicio) {
    travelData.dt_inicio = convertTimeStampToDate(req.body.dt_inicio);
  }
  if (req.body.dt_fim) {
    travelData.dt_fim = convertTimeStampToDate(req.body.dt_fim);
  }

  if (
    travelData.dt_fim &&
    travelData.dt_inicio &&
    travelData.dt_fim < travelData.dt_inicio
  ) {
    throw new ValidationError("Data de inicio anterior a data de fim da viagem");
  }

  let travel = await Travel.create(travelData);

  // Pegar usario com base no id_firebase
  // let token = req.headers.authorization || "";
  // let user = await getUserFromToken(token);
  let user = await User.findByPk(1);

  if (user) {
    //@ts-ignore
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

  if (
    payload.dt_fim &&
    payload.dt_inicio &&
    payload.dt_fim < payload.dt_inicio
  ) {
    throw new ValidationError("Data de inicio anterior a data de fim da viagem");
  }

  return await Travel.update(payload, { where: { id_viagem } });
}

export async function getTravel(id_viagem: string) {
  return await Travel.findOne({
    where: { id_viagem },
    include: ["spots", "expenses"],
  });
}

export async function getTravels(token: string) {
  let user = await getUserFromToken(token);
  if (user) {
    //@ts-ignore
    return await user.getTravels();
  }

  return;
}

export async function deleteTravel(id_viagem: string) {
  await Travel.destroy({ where: { id_viagem } });
}
