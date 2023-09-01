import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { bookTourDb, getBookingsDb, getTourByIdDb } from "@/services";
import { userRequestPayload } from "@/interfaces";
require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_TOKEN);

export const getBookingPaymentIntent = async (req: Request, res: Response) => {
  try {
    const tourId = req.body.tour;
    const tour = await getTourByIdDb(tourId);
    if (!tour) throw new Error(apiResponseMessages.TOUR_NOT_FOUND);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: tour.price * 100,
      automatic_payment_methods: { enabled: true },
      currency: "inr",
      description: "Tour Booking Payment",
    });

    return new APIResponse(res, httpStatus.OK, paymentIntent).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};

export const bookTour = async (req: Request, res: Response) => {
  try {
    const isTouExist = await getTourByIdDb(req.body.tour);
    if (isTouExist) {
      const isAlreadyBooked = await getBookingsDb(
        (req as Request & { user: userRequestPayload }).user._id,
        req.body.tour
      );
      if (!isAlreadyBooked.length) {
        const booking = await bookTourDb({
          ...req.body,
          user: (req as Request & { user: userRequestPayload }).user._id,
        });
        return new APIResponse(res, httpStatus.OK, booking).success();
      } else {
        return new APIResponse(
          res,
          httpStatus.CREATED,
          apiResponseMessages.ALREADY_BOOKED
        ).failed();
      }
    } else {
      return new APIResponse(
        res,
        httpStatus.RESOURCE_NOT_FOUND,
        apiResponseMessages.TOUR_NOT_FOUND
      ).failed();
    }
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
export const getbookingTour = async (req: Request, res: Response) => {
  try {
    const bookings = await getBookingsDb(
      (req as Request & { user: userRequestPayload }).user._id
    );
    return new APIResponse(res, httpStatus.OK, bookings).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
