import { HttpError, ctrlWrapper } from "../helpers/index.js";
import { Feedback } from "../models/feedback.js";
import { customAlphabet } from "nanoid";

const getFeedback = async (req, res) => {
  const { limit } = req.params;
  const result = await Feedback.find();
  res.json(result);
};

const getFeedbackById = async (req, res) => {
  const { feedbackId } = req.params;
  console.log(feedbackId);
  const result = await Feedback.findOneAndUpdate(
    { feedbackId },
    { opened: true }
  );
  res.json(result);
  // if given id doesnt exists returns null
};

const sendFeedback = async (req, res) => {
  const { body, email } = req.body;
  const date = new Date();
  const nanoid = customAlphabet("1234567890abcdef", 15);

  const result = await Feedback.create({
    feedbackId: nanoid(),
    body,
    email,
    date,
  });

  res.json(result);
};

export default {
  sendFeedback: ctrlWrapper(sendFeedback),
  getFeedback: ctrlWrapper(getFeedback),
  getFeedbackById: ctrlWrapper(getFeedbackById),
};
