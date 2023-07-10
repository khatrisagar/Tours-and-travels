import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { bookTourDb, getBookingsDb } from "@/services";

export const bookTour = async (req: Request, res: Response) => {
  try {
    const isAlreadyBooked = await getBookingsDb(
      (req as any).user._id,
      req.body.tour
    );
    if (!isAlreadyBooked.length) {
      const booking = await bookTourDb({
        ...req.body,
        user: (req as any).user._id,
      });
      return new APIResponse(res, httpStatus.OK, booking).success();
    } else {
      return new APIResponse(
        res,
        httpStatus.CREATED,
        apiResponseMessages.ALREADY_BOOKED
      ).failed();
    }
  } catch (error) {
    console.log(error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
export const getbookingTour = async (req: Request, res: Response) => {
  try {
    const bookings = await getBookingsDb((req as any).user._id);
    return new APIResponse(res, httpStatus.OK, bookings).success();
  } catch (error) {
    console.log(error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
