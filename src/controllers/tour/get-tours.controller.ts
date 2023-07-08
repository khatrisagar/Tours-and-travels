import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { getToursDb } from "@/services";

export const getTours = async (req: Request, res: Response) => {
  try {
    const tours = await getToursDb();
    console.log(tours);
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
