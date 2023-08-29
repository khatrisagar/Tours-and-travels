import { Booking } from "@/models";

export const getTourBookingsDb = async (tourId: string) => {
  try {
    const tours = await Booking.find({ tour: tourId }).populate({
      path: "user",
    });
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getAllTourBookingsDb = async () => {
  try {
    const tours = await Booking.find()
      .populate({
        path: "user",
      })
      .populate({
        path: "tour",
      });
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
