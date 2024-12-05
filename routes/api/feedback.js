import express from "express";
import ctrl from "../../controllers/feedback.js";
import { validateBody, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.post("/", ctrl.sendFeedback);

router.get("/", ctrl.getFeedback); //add authenticate middleware after tests

router.get("/:feedbackId", ctrl.getFeedbackById); //add authenticate middleware after tests

export default router;
