import SpotController from "../controllers/spot";
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", SpotController.create);
router.get("/", SpotController.getSpots);
router.get("/:id_local", SpotController.getDetail);
router.put("/:id_local", SpotController.update);
router.delete("/:id_local", SpotController.delete);

export = router;