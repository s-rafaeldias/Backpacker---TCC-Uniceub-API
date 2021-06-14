import TravelController from "../controllers/travel";
import UserTravelController from "../controllers/userTravel";
import { verifyToken, userTravelAllowed } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", verifyToken, TravelController.create);

router.get("/", verifyToken, TravelController.getTravels);
router.get("/:id_viagem", verifyToken, TravelController.getDetail);
router.put("/:id_viagem", verifyToken, TravelController.update);
router.delete("/:id_viagem", verifyToken, TravelController.delete);

router.post(
  "/:id_viagem/user/new",
  verifyToken,
  userTravelAllowed,
  UserTravelController.create
);
router.get(
  "/:id_viagem/user",
  verifyToken,
  userTravelAllowed,
  UserTravelController.getDetails
);
router.delete(
  "/:id_viagem/user/:id_usuario",
  verifyToken,
  userTravelAllowed,
  UserTravelController.delete
);

export = router;
