import { getTourById } from "@/controllers";
import { bookingInterface, bookingModelInterface } from "@/interfaces";
import { Booking } from "@/models";
import { ObjectId } from "mongoose";
import { getTourByIdDb } from "./tour.service";

export const getBookingsDb = async (userId: ObjectId, tourId?: ObjectId) => {
  try {
    let getCondition: { user: ObjectId; tour?: ObjectId } = { user: userId };
    if (tourId) {
      getCondition["tour"] = tourId;
    }
    const tours = await Booking.find({
      ...getCondition,
    });

    console.log(tours);
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const bookTourDb = async (bookingInfo: bookingInterface) => {
  try {
    const tours = await Booking.create(bookingInfo);
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
