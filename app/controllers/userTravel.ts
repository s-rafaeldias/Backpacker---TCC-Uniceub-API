import { createNewTraveler, deleteUserTravel, getUsersFromTravel} from "../services/userTravel";
import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";

const UserTravelController = {
  create: async (req: Request, res: Response) => {
    try {
      await createNewTraveler(req);
      return res.sendStatus(201);
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

  getDetails: async (req: Request, res: Response) => {
    try {
      let { id_viagem } = req.params;

      let users = await getUsersFromTravel(id_viagem);

      if (users !== null) {
        return res.status(200).json(users)
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
      let { id_usuario, id_viagem } = req.params;
      await deleteUserTravel(id_viagem, id_usuario);

      return res.status(200).json({
        message: "Apagado",
        status: "Success",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Bad Request",
      });
    }
  },
};

export default UserTravelController;
