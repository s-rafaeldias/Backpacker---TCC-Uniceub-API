import UserController from "../controllers/user";
import { verifyToken } from '../middlewares/auth';
import { Router, Request, Response } from 'express';

export const user = (router: Router) => {
  router.get("/", (_req: Request, res: Response) => {
    res.json({ msg: "root" });
  });

/*  router.post("/new", UserController.create);

  router.put("/:firebase_id", verifyToken, UserController.update);
  router.get("/:firebase_id", verifyToken, UserController.getDetail);
  router.delete("/:firebase_id", verifyToken, UserController.delete);*/

  router.post("/new", UserController.create);

  router.put("/:id_firebase", UserController.update);
  router.get("/:id_firebase", UserController.getDetail);
  router.delete("/:id_firebase", UserController.delete);

  return router;
};
