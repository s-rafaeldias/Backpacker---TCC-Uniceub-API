import TravelController from "../controllers/travel";
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", TravelController.create);

router.get("/", TravelController.getTravels);
router.get("/:id_viagem", TravelController.getDetail);
router.put("/:id_viagem", TravelController.update);
router.delete("/:id_viagem", TravelController.delete);

export = router;
