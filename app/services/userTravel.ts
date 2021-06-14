import { Request } from "express";
import { Travel, User } from "../models/index";
import { ValidationError } from "sequelize";

export async function createNewTraveler(req: Request) {
  let { email: newTravelerEmail } = req.body;
  let { id_viagem } = req.params;

  let user = await User.findOne({ where: { email: newTravelerEmail } });
  let travel = await Travel.findByPk(id_viagem);

  if (!user) throw new ValidationError("Usuário não existe");
  if (!travel) throw new ValidationError("Viagem não existe");

  return await user.addTravel(travel);
}

export async function getUsersFromTravel(id_viagem: string) {
  let viagem = await Travel.findByPk(id_viagem);
  // @ts-ignore
  let users = await viagem.getUsers();

  return users;
}

export async function deleteUserTravel(id_viagem: string, id_usuario: string) {
  let travel = await Travel.findByPk(id_viagem);

  // @ts-ignore
  return await travel.removeUser(id_usuario);
}
