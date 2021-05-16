import {
  createDocument,
  updateDocument,
  getDocument,
  getAllDocument,
  deleteDocument,
} from "../services/document";
import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { DocumentCreationAttributes } from "../models/document";

const DocumentController = {
  create: async (req: Request, res: Response) => {
    try {
      let document: DocumentCreationAttributes = {
        nome_documento: req.body.nome_documento,
        imagem_path: req.body.imagem_path,
      };
      await createDocument(document, req);
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
      let { id_documento } = req.params;
      let payload = req.body;

      await updateDocument(id_documento, payload);

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

  getDocuments: async (req: Request, res: Response) => {
    try {
      let { id_viagem } = req.body.id_viagem;
      let document = await getAllDocument(id_viagem);

      if (document) {
        return res.status(200).json(document);
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
      let { id_documento } = req.params;
      let document = await getDocument(id_documento);

      if (document) {
        return res.status(200).json(document.get());
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
      let { id_documento } = req.params;
      await deleteDocument(id_documento);

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

export default DocumentController;
