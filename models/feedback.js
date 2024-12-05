import { model, Schema } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";

const feedbackSchema = new Schema({
  feedbackId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});

export const Feedback = model("feedback", feedbackSchema);
