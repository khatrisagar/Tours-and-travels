import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import {
  addToursDb,
  updateToursDb,
  deleteToursDb,
  getTourByIdDb,
  getAdminTourByIdDb,
} from "@/services";
import { userRequestPayload } from "@/interfaces";

export const addTours = async (req: Request, res: Response) => {
  try {
    const tours = await addToursDb({
      ...req.body,
      organizer: (req as Request & { user: userRequestPayload }).user._id,
    });
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

export const updateTours = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId;
    const tours = await updateToursDb(tourId, {
      ...req.body,
      organizer: (req as Request & { user: userRequestPayload }).user._id,
    });
    return new APIResponse(res, httpStatus.OK, tours).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
export const deleteTours = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.tourId;
    const isTourExist = await getAdminTourByIdDb(tourId);
    console.log("isTourExist", isTourExist);
    if (isTourExist) {
      await deleteToursDb(tourId);
      return new APIResponse(
        res,
        httpStatus.OK,
        apiResponseMessages.DELETED_SUCCESS
      ).successMessage();
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
