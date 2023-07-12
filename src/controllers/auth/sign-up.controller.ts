import { apiResponseMessages, httpStatus } from "@/enums";
import { signUpUserDb, findUserDb } from "@/services";
import { APIResponse, encryptPassword } from "@/utils";
import { Request, Response } from "express";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const isUserExist = await findUserDb(email);
    if (!isUserExist) {
      const user = await signUpUserDb({
        ...req.body,
      });
      return new APIResponse(res, httpStatus.CREATED, user).success();
    } else {
      return new APIResponse(
        res,
        httpStatus.BAD_REQUEST,
        apiResponseMessages.USER_ALREADY_EXIST
      ).failed();
    }
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.OK,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
