// import { createTravel, updateTravel, getTravel, getAllTravel, deleteTravel } from "../services/travel";
import * as travelService from '../services/travel';

import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";

const TravelController = {
  create: async (req: Request, res: Response) => {
    try {
      let travel = await travelService.createTravel(req);
      return res.status(201).json(travel);
    } catch (err) {
      console.log(err);

      if (err instanceof UniqueConstraintError) {
        return res.status(400).json({
          message: "Campo chave duplicado",
          status: "Failure",
        });
      } else if (err instanceof ValidationError) {
        return res.status(400).json({
          message: err.message,
          status: "Failure",
        });
      }

      return res.status(500).json({
        message: "Erro",
        status: "Failure",
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      let { id_viagem } = req.params;
      let payload = req.body;

      await travelService.updateTravel(id_viagem, payload);

      return res.status(200).json({
        message: "Updated.",
        status: "Success",
      });
    } catch (err) {

      return res.status(500).json({
        message: "Incorrect",
        status: "Failure",
      });
    }
  },

  getTravels: async (req: Request, res: Response) => {
    try {
      let token = req.headers.authorization || "";
      let travels = await travelService.getTravels(token);

      if (travels) {
        return res.status(200).json(travels);
      }

      return res.status(404).json({
        message: "Not Found",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Bad Request",
      });
    }
  },

  getDetail: async (req: Request, res: Response) => {
    try {
      let { id_viagem } = req.params;
      let travel = await travelService.getTravel(id_viagem);

      if (travel !== null) {
        return res.status(200).json(travel.get());
      }

      return res.status(404).json({
        message: "Not Found",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Bad Request",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      let { id_viagem } = req.params;
      await travelService.deleteTravel(id_viagem);

      return res.status(200).json({
        message: "Apagado",
        status: "Success",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Bad Request",
      });
    }
  },
};

export default TravelController;
