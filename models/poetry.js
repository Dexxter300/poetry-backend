import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";

const typesOfContent = ["prose", "poetry", "mixed"];

const pageSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

const poetrySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  // body: {
  //   type: String,
  //   required: [true, "Body is required"],
  // },
  poetryId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  coverUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  tag: {
    type: String,
    enum: typesOfContent,
  },
  // pages: [pageSchema],
  body: {
    type: String
  },
  about: {
    type: String,
  },
});

export const poetryAddSchema = Joi.object({
  name: Joi.string().required(),
  body: Joi.string().required(),
  date: Joi.string().required(),
});

export const Poetry = model("poetry", poetrySchema);
