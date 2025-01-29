import express from "express";
// import multer from "multer";
// import cloudinary from "../../utils/cloudinary";
import ctrl from "../../controllers/poetry.js";
import { validateBody, authenticate } from "../../middlewares/index.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

router.get("/get-upload-url", ctrl.getUploadUrl); // add auth middleware

router.get("/", ctrl.getPoetry);

router.post("/", ctrl.addPoetry);

router.patch("/:id", authenticate, ctrl.updatePoetryById);

router.delete("/:id", authenticate, ctrl.deletePoetry);

router.get("/:id", ctrl.getPoetryById);

export default router;
