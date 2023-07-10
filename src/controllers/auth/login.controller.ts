import { Request, Response } from "express";
import { findUserDb } from "@/services";
import { verifyPassword, createJWTToken, APIResponse } from "@/utils";
import { ObjectId } from "mongoose";
import { httpStatus, apiResponseMessages } from "@/enums";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserDb(email);
    if (user) {
      const isRightPassword = await verifyPassword(
        password,
        user?.password.toString()
      );
      if (isRightPassword) {
        console.log("aaaaaa", user);
        const token = createJWTToken(user._id);
        return new APIResponse(res, httpStatus.OK, token).success();
      } else {
        return new APIResponse(
          res,
          httpStatus.OK,
          apiResponseMessages.INVALID_EMAIL_PASSWORD
        ).failed();
      }
    } else {
      return new APIResponse(
        res,
        httpStatus.OK,
        apiResponseMessages.INVALID_EMAIL_PASSWORD
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
