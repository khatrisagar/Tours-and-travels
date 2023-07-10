import { apiResponseMessages, httpStatus } from "@/enums";
import { addReviewDb, getBookingsDb, getReviewDb } from "@/services";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const tours = await getReviewDb();
    return new APIResponse(res, httpStatus.OK, tours).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};

export const addReviews = async (req: Request, res: Response) => {
  try {
    const isPartOfTour = await getBookingsDb(
      (req as any).user._id,
      req.body.tour
    );
    if (isPartOfTour.length) {
      const tours = await addReviewDb({
        ...req.body,
        user: (req as any).user._id,
      });
      return new APIResponse(res, httpStatus.CREATED, tours).success();
    } else {
      return new APIResponse(
        res,
        httpStatus.UNAUTHORIZED,
        apiResponseMessages.UNAUTHORIZED
      ).successMessage();
    }
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
