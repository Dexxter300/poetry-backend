import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";

const visitStatSchema = new Schema({
  date: {
    type: Date,
  },
  visitorIp: {
    type: String,
  },
  visitRegion: {
    type: String,
  },
});

export const VisitStat = model("visitstat", visitStatSchema);
