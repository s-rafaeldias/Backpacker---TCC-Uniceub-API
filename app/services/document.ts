import { Request } from "express";
import { Document } from "../models";
import { DocumentCreationAttributes } from "../models/document";

export async function createDocument(document: DocumentCreationAttributes) {
	// let { nome_categoria } = req.body;
	
	// let categoria_doc = await DocumentCategory.findOne({ where: {nome_categoria: nome_categoria} })

	// if (!categoria_doc){
		// categoria_doc = await DocumentCategory.create({nome_categoria: nome_categoria})
	// }
	// document.id_categoria_documento = categoria_doc.id_categoria_documento
	return await Document.create(document);
}

export async function updateDocument(id_documento: string, payload) {
  return await Document.update(payload, { where: { id_documento } });
}

export async function getDocument(id_documento: string) {
  return await Document.findOne({ where: { id_documento } });
}

export async function deleteDocument(id_documento: string) {
  return await Document.destroy({ where: { id_documento } });
}

export async function getAllDocument(id_viagem: string) {
  return await Document.findAll({ where: { id_viagem } });
}
