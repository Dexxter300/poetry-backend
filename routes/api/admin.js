import express from "express";
import ctrl from "../../controllers/visitStats.js";
import { validateBody, authenticate } from "../../middlewares/index.js";
// import { schemas } from "../../models/user.js";
// import { visitStat, getVisitStats } from "../../middlewares/visitStat.js";
// import { processVisit, getVisitStats } from "../../controllers/visitStats.js";

const router = express.Router();

router.get("/get-visit-stats/:monthNumber", authenticate, ctrl.getVisitStats);

export default router;
