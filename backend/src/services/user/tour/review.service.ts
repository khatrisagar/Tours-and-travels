import { reviewModelInterface } from "@/interfaces";
import { Review } from "@/models";

export const addReviewDb = async (reviewPayload: reviewModelInterface) => {
  try {
    const review = await Review.create(reviewPayload);
    return review;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getReviewDb = async () => {
  try {
    const reviews = await Review.find();
    return reviews;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
