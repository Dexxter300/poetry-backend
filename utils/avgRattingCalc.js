import { Poetry } from "../models/poetry";

const calcRating = async (ratings, poetryId) => {
  const allRatings = ratings.reduce((accum, rating) => {
    return accum + rating.userRating;
  });

  const avgRating = allRatings / ratings.length;

  const updateAvgRating = await Poetry.findByIdAndUpdate(
    { poetryId },
    {
      avgRating,
    }
  );
  return avgRating;
};
