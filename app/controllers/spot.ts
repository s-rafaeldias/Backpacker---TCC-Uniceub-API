import {
  createSpot,
  updateSpot,
  getSpot,
  getSpots,
  deleteSpot,
} from "../services/spot";
import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError, DatabaseError } from "sequelize";
import { SpotCreationAttributes } from "../models/spot";

const SpotController = {
  create: async (req: Request, res: Response) => {
    try {
      let spot: SpotCreationAttributes = {
        nome_local: req.body.nome_local,
        id_viagem: req.body.id_viagem,
        dt_planejada: req.body.dt_planejada,
        descricao_local: req.body.descricao_local,
      };
      let newSpot = await createSpot(spot);
      return res.status(201).json(newSpot);
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
      } else if (err instanceof DatabaseError) {
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
      let { id_local } = req.params;
      let payload = req.body;

      await updateSpot(id_local, payload);

      return res.status(200).json({
        message: "Updated.",
        status: "Success",
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          message: err.message,
          status: "Failure"
        })
      }

      return res.status(500).json({
        message: "Incorrect",
        status: "Failure",
      });
    }
  },

  getSpots: async (req: Request, res: Response) => {
    try {
      let id_viagem = req.query.id_viagem as string;
      let spot = await getSpots(id_viagem);

      if (spot) {
        return res.status(200).json(spot);
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
      let { id_local } = req.params;
      let spot = await getSpot(id_local);

      if (spot) {
        return res.status(200).json(spot.get());
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
      let { id_local } = req.params;
      await deleteSpot(id_local);

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

export default SpotController;
