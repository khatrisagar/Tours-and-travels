import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { getAdminToursDb, getAdminTourByIdDb } from "@/services";

export const getAdminTours = async (req: Request, res: Response) => {
  try {
    const tours = await getAdminToursDb();
    return new APIResponse(res, httpStatus.OK, tours).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};

export const getAdminTourById = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId;
    const tours = await getAdminTourByIdDb(tourId);
    return new APIResponse(res, httpStatus.OK, tours).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
