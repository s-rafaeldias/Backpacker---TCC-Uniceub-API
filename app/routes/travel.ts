import TravelController from "../controllers/travel";
import { verifyToken } from '../middlewares/auth';
import { Router, Request, Response } from 'express';
const router = Router()
// export const travel = (router: Router) => {
//   router.get("/", (_req: Request, res: Response) => {
//     res.json({ msg: "root" });
//   });

/*  router.post("/new", TravelController.create);
  router.get("/all", verifyToken, TravelController.getAllDetail);
  router.get("/:id_viagem", verifyToken, TravelController.getDetail);
  router.put("/:id_viagem", verifyToken, TravelController.update);
  router.delete("/:id_viagem", verifyToken, TravelController.delete);*/

router.post("/new", TravelController.create);

router.get("/", TravelController.getTravels);
router.get("/:id_viagem", TravelController.getDetail);
router.put("/:id_viagem", TravelController.update);
router.delete("/:id_viagem", TravelController.delete);
export {router as travel};
//   return router;
// };


