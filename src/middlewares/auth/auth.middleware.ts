import { APIResponse, verifyToken } from "@/utils";
import { Request, Response, NextFunction } from "express";
import { findByIdUserDb } from "@/services";
import { ObjectId } from "mongoose";
import { httpStatus, apiResponseMessages } from "enums";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const decode: any = verifyToken(req.headers.authorization);
      const user: any = await findByIdUserDb(decode.id as ObjectId);
      (req as Request & { user: object }).user = user;
      if (user) {
        return next();
      } else {
        console.log("aaaaa");
        return new APIResponse(
          res,
          httpStatus.UNAUTHORIZED,
          apiResponseMessages.UNAUTHORIZED
        ).failed();
      }
    } else {
      return new APIResponse(
        res,
        httpStatus.UNAUTHORIZED,
        apiResponseMessages.UNAUTHORIZED
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
