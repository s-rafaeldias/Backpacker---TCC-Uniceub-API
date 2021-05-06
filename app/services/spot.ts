import { Request } from "express";
import admin from "firebase-admin";

import { convertTimeStampToDate } from "../helper/convertDate";
import { Spot } from "../models";
import { SpotModel, SpotCreationAttributes } from "../models/spot";

export async function createSpot(spot: SpotCreationAttributes) {
  return await Spot.create(spot);
}

export async function updateSpot(id_local: string, payload) {
  return await Spot.update(payload, { where: { id_local } });
}

export async function getSpot(id_local: string) {
  return await Spot.findOne({ where: { id_local } });
}

export async function deleteSpot(id_local: string) {
    return await Spot.destroy({ where: { id_local } });
}

export async function getAllSpot(id_viagem: string) {
    return await Spot.findAll({ where: { id_viagem } });
  }
  