import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: "root travel" });
});

export = router;
