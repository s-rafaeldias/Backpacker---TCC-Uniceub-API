import {
  createExpense,
  updateExpense,
  getExpense,
  getAllExpense,
  deleteExpense,
} from "../services/expense";
import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ExpenseCreationAttributes } from "../models/expense";

const ExpenseController = {
  create: async (req: Request, res: Response) => {
    try {
      let expense: ExpenseCreationAttributes = {
        nome_gasto: req.body.nome_gasto,
        id_viagem: req.body.id_viagem,
        dt_gasto: req.body.dt_gasto,
        valor_gasto: req.body.valor_gasto,
        descricao_gasto: req.body.descricao_gasto,
        link_imagem_gasto: req.body.link_imagem_gasto,
      };
      await createExpense(expense);
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
      let { id_gasto } = req.params;
      let payload = req.body;

      await updateExpense(id_gasto, payload);

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

  getExpense: async (req: Request, res: Response) => {
    try {
      let id_viagem = req.query.id_viagem as string;
      let expense = await getAllExpense(id_viagem);

      if (expense) {
        return res.status(200).json(expense);
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
      let { id_gasto } = req.params;
      let expense = await getExpense(id_gasto);

      if (expense) {
        return res.status(200).json(expense.get());
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
      let { id_gasto } = req.params;
      await deleteExpense(id_gasto);

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

export default ExpenseController;
