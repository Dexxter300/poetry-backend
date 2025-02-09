import express from "express";
import ctrl from "../../controllers/auth.js";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { schemas } from "../../models/user.js";
import { visitStat, getVisitStats } from "../../middlewares/visitStat.js";

const router = express.Router();

// router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);
router.post(
  "/signin",
  validateBody(schemas.loginSchema),
  ctrl.login
);

// router.get("/rs", visitStat, validateBody(schemas.loginSchema), ctrl.login); /// delete this line in future

router.get("/get-visit-stats/:monthNumber", getVisitStats); /// delete this line in future

router.post("/signout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.userRefresh);

export default router;
