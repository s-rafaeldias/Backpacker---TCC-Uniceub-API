import ExpenseController from "../controllers/expense";
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", ExpenseController.create);
router.get("/", ExpenseController.getExpense);
router.get("/:id_gasto", ExpenseController.getDetail);
router.put("/:id_gasto", ExpenseController.update);
router.delete("/:id_gasto", ExpenseController.delete);

export = router;