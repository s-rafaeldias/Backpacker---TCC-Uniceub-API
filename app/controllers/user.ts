import { createUser, updateUser, getUser, deleteUser } from "../services/user";
import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { UserCreationAttributes } from "../models/user";

import * as admin from "firebase-admin";

const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      let user: UserCreationAttributes = {
        email: req.body.email,
        nome_usuario: req.body.nome,
        dt_nascimento: req.body.dt_nascimento,
        id_firebase: req.body.id_firebase,
      };

      await createUser(user);
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
      // TODO: colocar isso em uma lib
      let token = req.headers.authorization || "";
      let decodeToken = await admin.auth().verifyIdToken(token);

      let payload = req.body;

      await updateUser(decodeToken.uid, payload);

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
      // TODO: colocar isso em uma lib
      let token = req.headers.authorization || "";
      let decodeToken = await admin.auth().verifyIdToken(token);
      let user = await getUser(decodeToken.uid);

      if (user) {
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
    // TODO: colocar isso em uma lib
    let token = req.headers.authorization || "";
    let decodeToken = await admin.auth().verifyIdToken(token);

    let softDelete = req.body.soft_delete;

    try {
      await deleteUser(decodeToken.uid, softDelete);

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
