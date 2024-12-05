import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "nigga"],
  },
  body: {
    type: String,
    required: [true, "nigga"],
  },
  date: {
    type: Date,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

export const postAddSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  date: Joi.string().required(),
});

export const Post = model("blog", postSchema);
