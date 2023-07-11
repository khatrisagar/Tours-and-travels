import { Tour } from "@/models";
import { ObjectId } from "mongoose";

export const getToursDb = async () => {
  try {
    const tours = await Tour.find({ isTourActive: true });
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getTourByIdDb = async (tourId: string | ObjectId) => {
  try {
    const tour = await Tour.findById(tourId)
      .where({ isTourActive: true })
      .populate({ path: "reviews" });
    return tour;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
