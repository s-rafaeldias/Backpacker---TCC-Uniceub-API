import ExpenseController from "../controllers/expense";
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", verifyToken, ExpenseController.create);
router.get("/", verifyToken, ExpenseController.getExpense);
router.get("/:id_gasto", verifyToken, ExpenseController.getDetail);
router.put("/:id_gasto", verifyToken, ExpenseController.update);
router.delete("/:id_gasto", verifyToken, ExpenseController.delete);

export = router;