import { apiResponseMessages, httpStatus } from "@/enums";
import { APIFeature, APIResponse } from "@/utils";
import { Request, Response } from "express";
import { updateUserProfileDb } from "@/services";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    return new APIResponse(res, httpStatus.OK, user).success();
  } catch (error) {
    console.log(error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { name, email, contact } = req.body;

    const user = await updateUserProfileDb(userId, { name, email, contact });
    return new APIResponse(res, httpStatus.CREATED, user).success();
  } catch (error) {
    console.log(error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
