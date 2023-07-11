import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { getTourBookingsDb } from "@/services";

export const getTourBookings = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId;
    const bookings = await getTourBookingsDb(tourId);
    return new APIResponse(res, httpStatus.OK, bookings).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
