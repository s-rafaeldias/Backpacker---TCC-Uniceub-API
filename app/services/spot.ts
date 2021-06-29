import { convertTimeStampToDate } from "../helper/convertDate";
import { Spot, Travel } from "../models";
import { SpotCreationAttributes } from "../models/spot";
import { ValidationError } from "sequelize";

export async function createSpot(spot: SpotCreationAttributes) {
  if (spot.dt_planejada) {
    spot.dt_planejada = convertTimeStampToDate(spot.dt_planejada);
  }

  let travel = await Travel.findByPk(spot.id_viagem);
  if (travel) {
    if (
      spot.dt_planejada &&
      (spot.dt_planejada > travel.dt_fim ||
        spot.dt_planejada < travel.dt_inicio)
    ) {
      throw new ValidationError("Data invalida");
    }
  }
  return await Spot.create(spot);
}

export async function updateSpot(id_local: string, payload) {
  if (payload.dt_planejada) {
    payload.dt_planejada = convertTimeStampToDate(payload.dt_planejada);
    let spot = await Spot.findByPk(id_local);
    // @ts-ignore
    let travel = await spot.getTravel();
    if (travel && spot) {
      if (
        (payload.dt_planejada > travel.dt_fim ||
          payload.dt_planejada < travel.dt_inicio)
      ) {
        throw new ValidationError("Data invalida");
      }
    }
  }

  return await Spot.update(payload, { where: { id_local } });
}

export async function getSpot(id_local: string) {
  return await Spot.findOne({ where: { id_local } });
}

export async function deleteSpot(id_local: string) {
  return await Spot.destroy({ where: { id_local } });
}

export async function getSpots(id_viagem: string) {
  return await Spot.findAll({ where: { id_viagem } });
}
