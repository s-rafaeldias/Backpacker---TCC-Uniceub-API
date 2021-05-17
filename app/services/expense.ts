import { Request } from "express";
// import admin from "firebase-admin";

import { convertTimeStampToDate } from "../helper/convertDate";
import { Expense } from "../models";
import { ExpenseCreationAttributes } from "../models/expense";

export async function createExpense(expense: ExpenseCreationAttributes) {
  expense.dt_gasto = convertTimeStampToDate(expense.dt_gasto);
  return await Expense.create(expense);
}

export async function updateExpense(id_gasto: string, payload) {
  return await Expense.update(payload, { where: { id_gasto } });
}

export async function getExpense(id_gasto: string) {
  return await Expense.findOne({ where: { id_gasto } });
}

export async function deleteExpense(id_gasto: string) {
  return await Expense.destroy({ where: { id_gasto } });
}

export async function getAllExpense(id_gasto: string) {
  return await Expense.findAll({ where: { id_gasto } });
}
