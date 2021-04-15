import TravelController from "../controllers/travel";
import UserTravelController from "../controllers/userTravel"
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", TravelController.create);


router.get("/", TravelController.getTravels);
router.get("/:id_viagem", TravelController.getDetail);
router.put("/:id_viagem", TravelController.update);
router.delete("/:id_viagem", TravelController.delete);


router.post("/user/new", UserTravelController.create)
router.get('/:id_viagem/user', UserTravelController.getDetails)
router.delete('/:id_viagem/user/:id_usuario', UserTravelController.delete)

export = router;
