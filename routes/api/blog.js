import express from "express";
import ctrl from "../../controllers/blog.js";
import { validateBody, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/posts", ctrl.getPosts);

router.get("/post/:postId", ctrl.getPostById);

router.post("/post", ctrl.addPost); // add authenticate middlewares

router.patch("/post", ctrl.editPost); // add authenticate middlewares

router.delete("/post", ctrl.deletePost); // add authenticate middlewares

export default router;
