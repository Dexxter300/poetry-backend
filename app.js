import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/api/auth.js";
import blogRouter from "./routes/api/blog.js";
import adminRouter from "./routes/api/admin.js";
import feedbackRouter from "./routes/api/feedback.js";
import poetryRouter from "./routes/api/poetry.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set("trust proxy", true);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/poetry", poetryRouter);

export default app;
