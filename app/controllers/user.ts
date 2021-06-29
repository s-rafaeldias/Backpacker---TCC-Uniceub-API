import admin from "firebase-admin";
import { createUser, updateUser, getUser, deleteUser } from "../services/user";
import { Request, Response } from "express";
import {
  UniqueConstraintError,
  ValidationError,
  DatabaseError,
} from "sequelize";
import { UserCreationAttributes } from "../models/user";

const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      let userData: UserCreationAttributes = {
        email: req.body.email,
        nome_usuario: req.body.nome,
        dt_nascimento: req.body.dt_nascimento,
        id_firebase: req.body.id_firebase,
        senha: req.body.password,
      };

      let user = await createUser(userData);
      return res.status(201).json(user);
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
      } else if (err.code === "auth/email-already-exists") {
        return res.status(400).json({
          message: "Email ja cadastrado",
          status: err.code,
        });
      } else if (err instanceof DatabaseError) {
        return res.status(400).json({
          message: "Erro ao cadastrar no banco",
          status: err.original.message,
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
      let userToUpdate = req.params.id_firebase;
      let payload = req.body;

      await updateUser(userToUpdate, payload);

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({
        message: "Incorrect",
        status: "Failure",
      });
    }
  },

  getDetail: async (req: Request, res: Response) => {
    try {
      let user = await getUser(req.params.id_firebase);

      if (user) {
        return res.status(200).json(user.get());
      }

      return res.status(404).json({
        message: "Not Found",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Bad Request",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    let idFirebase = req.params.id_firebase;
    let softDelete = req.body.soft_delete;

    try {
      await deleteUser(idFirebase, softDelete);

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

export default UserController;
