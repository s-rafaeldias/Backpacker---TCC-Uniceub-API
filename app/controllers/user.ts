import { createUser, updateUser, getUser, deleteUser } from "../services/user";
import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";

const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      await createUser(req);
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

  update: async (req: Request, res: Response) => {
    try {
      let { firebase_id } = req.params;
      let payload = req.body;

      await updateUser(firebase_id, payload);

      return res.status(200).json({
        message: "Updated.",
        status: "Success",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Incorrect",
        status: "Failure",
      });
    }
  },

  getDetail: async (req: Request, res: Response) => {
    try {
      let { firebase_id } = req.params;
      let user = await getUser(firebase_id);

      if (user !== null) {
        return res.status(200).json(user.get());
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
    let { firebase_id } = req.params;
    let softDelete = req.body.soft_delete;

    try {
      await deleteUser(firebase_id, softDelete);

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

export default UserController;
