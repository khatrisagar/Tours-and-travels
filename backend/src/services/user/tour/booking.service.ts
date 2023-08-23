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
    const myBooking = await Booking.find({
      ...getCondition,
    });

    return myBooking;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const bookTourDb = async (bookingInfo: bookingInterface) => {
  try {
    const bookTour = await Booking.create(bookingInfo);
    return bookTour;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
