import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: [true, "Name is required"],
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

// const registerSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required(),
// });

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

// const forgotPassword = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
// });

export const updateSchema = Joi.object({
  name: Joi.string(),
});

export const schemas = {
  //   registerSchema,
  loginSchema,
  emailSchema,
  // forgotPassword,
};
export const User = model("user", userSchema);
