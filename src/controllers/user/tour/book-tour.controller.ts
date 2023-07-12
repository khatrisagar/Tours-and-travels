import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { bookTourDb, getBookingsDb, getTourByIdDb } from "@/services";
import { userRequestPayload } from "@/interfaces";

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
