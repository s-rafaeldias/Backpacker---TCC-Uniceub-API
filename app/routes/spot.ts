import SpotController from "../controllers/spot";
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", verifyToken, SpotController.create);
router.get("/", verifyToken, SpotController.getSpots);
router.get("/:id_local", verifyToken, SpotController.getDetail);
router.put("/:id_local", verifyToken, SpotController.update);
router.delete("/:id_local", verifyToken, SpotController.delete);

export = router;
