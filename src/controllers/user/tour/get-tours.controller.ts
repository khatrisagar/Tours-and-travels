import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { getToursDb, getTourByIdDb } from "@/services";

export const getTours = async (req: Request, res: Response) => {
  try {
    const tours = await getToursDb();
    return new APIResponse(res, httpStatus.OK, tours).success();
  } catch (error) {
    console.log(error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId;
    const tours = await getTourByIdDb(tourId);
    if (tours) {
      return new APIResponse(res, httpStatus.OK, tours).success();
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
