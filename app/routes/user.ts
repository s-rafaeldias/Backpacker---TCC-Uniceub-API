import UserController from "../controllers/user";
import { verifyToken, userAllowed } from "../middlewares/auth";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ msg: "root" });
});

router.post("/new", UserController.create);

router.put("/:id_firebase", verifyToken, userAllowed, UserController.update);
router.get("/:id_firebase", verifyToken, userAllowed, UserController.getDetail);
// TODO: test
router.delete("/:id_firebase", verifyToken, userAllowed, UserController.delete);

export = router;
