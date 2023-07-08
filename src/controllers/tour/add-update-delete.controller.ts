import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { addToursDb } from "@/services";
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
