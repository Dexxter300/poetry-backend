import { Poetry } from "../models/poetry.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";
import { customAlphabet } from "nanoid";

import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const addPoetry = async (req, res) => {
  const { name, body, coverUrl, audioUrl, about, tag, pages } = req.body;

  const nanoid = customAlphabet("1234567890abcdef", 15);

  const addPoetry = await Poetry.create({
    name,
    body,
    date: new Date(),
    poetryId: nanoid(),
    coverUrl,
    audioUrl,
    about,
    tag,
    pages,
  });

  res.status(201).json(addPoetry); // chage return to "complete"
};

const getPoetry = async (req, res) => {
  const { page, limit } = req.params;

  const result = await Poetry.aggregate([
    { $sort: { date: -1 } },
    { $skip: page * limit },
    { $limit: limit },
  ]);
  res.json(result);
};

const getPoetryById = async (req, res) => {
  const { poetryId } = req.params;
  const result = await Poetry.findOne({ poetryId });

  if (!result) {
    throw HttpError(404, "sosi");
  }

  res.json(result);
};

const deletePoetry = async (req, res) => {
  const { id } = req.body;
  const deletePoetry = await Poetry.deleteOne({
    id,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const updatePoetryById = async (req, res) => {
  const { id } = req.params;

  const result = await Food.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const getUploadUrl = async (req, res) => {
  const uploadUrl = await cloudinary.uploader.upload_url();
  res.json(uploadUrl);
};
// const ratePoetry = async (req, res) => {
//   const { poetryId, userRating } = req.body;
//   const findPoetry = await Poetry.findOne({ poetryId });

//   if (!findPoetry) {
//     throw HttpError(404, "Not Found");
//   }
//   const updateRatings = await Poetry.findByIdAndUpdate(
//     { poetryId },
//     {
//       $push: {
//         ratings: {
//           uerId: 1,
//           userRating,
//         },
//       },
//     },
//     { returnNewDocument: true }
//   );

//   const updateAvg = await calcRatig(updateRatings, poetryId);

//   // wrtite an a func for calculating avg ratting based on a new rate
// };

export default {
  getPoetry: ctrlWrapper(getPoetry),
  getUploadUrl: ctrlWrapper(getUploadUrl),
  getPoetryById: ctrlWrapper(getPoetryById),
  deletePoetry: ctrlWrapper(deletePoetry),
  addPoetry: ctrlWrapper(addPoetry),
  updatePoetryById: ctrlWrapper(updatePoetryById),
};
