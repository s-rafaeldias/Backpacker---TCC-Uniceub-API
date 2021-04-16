import { Request } from "express";
import { convertTimeStampToDate } from "../helper/convertDate";

import { Travel, User } from "../models/index";
import { getUserFromToken } from '../services/user';


export async function createNewTraveler(req: Request) {
  let {email: newTravelerEmail} = req.body
  let {id_viagem} = req.body
  // Pegar usario com base no id_firebase
  // let token = req.headers.authorization || "sdfgsdf";

  // let user = await getUserFromToken(token);
  let user = await User.findOne( { where: {email:newTravelerEmail} } )
  let travel = await Travel.findByPk(id_viagem)

  if (user && travel) {
    return await user.addTravel(travel);
  }
  return;
}

export async function getUsersFromTravel(id_viagem: string) {
  let viagem = await Travel.findOne({ where: { id_viagem }})
  let users = await viagem.getUser();

  return users;
}


export async function deleteUserTravel(id_viagem: string, id_usuario: string) {
  let user = await User.findOne({ where : { id_usuario }})
  let travel = await Travel.findOne({ where : { id_viagem }})
  
  await user.removeTravel(travel);
}