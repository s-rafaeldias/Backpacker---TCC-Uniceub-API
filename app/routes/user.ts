import UserController from "../controllers/user";
import { verifyToken } from "../middlewares/auth";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ msg: "root" });
});

router.post("/new", UserController.create);

router.put("/:firebase_id", verifyToken, UserController.update);
router.get("/:firebase_id", UserController.getDetail);
router.delete("/:firebase_id", verifyToken, UserController.delete);

export = router;
