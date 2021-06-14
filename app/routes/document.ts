import DocumentController from "../controllers/document";
import { verifyToken } from "../middlewares/auth";

import { Router } from "express";

const router = Router();

router.post("/new", DocumentController.create);
router.get("/", DocumentController.getDocuments);
router.get("/:id_documento", DocumentController.getDetail);
router.put("/:id_documento", DocumentController.update);
router.delete("/:id_documento", DocumentController.delete);

export = router;