import { APIResponse } from "@/utils";
import { Request, Response, NextFunction } from "express";

import { httpStatus, apiResponseMessages } from "enums";
import { getSingleRoleDb } from "@/services";

export const userRoutesProtection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUserRole = await getSingleRoleDb((req as any).user.roles, "USER");
    if (getUserRole.length) {
      return next();
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
export const adminRoutesProtection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUserRole = await getSingleRoleDb((req as any).user.roles, "ADMIN");
    if (getUserRole.length) {
      return next();
    } else {
      return new APIResponse(
        res,
        httpStatus.UNAUTHORIZED,
        apiResponseMessages.UNAUTHORIZED
      ).failed();
    }
  } catch (error) {
    console.log(error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
