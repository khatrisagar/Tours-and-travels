import { apiResponseMessages, httpStatus } from "@/enums";
import { APIResponse } from "@/utils";
import { Request, Response } from "express";
import { createRoleDb, getRolesDb } from "@/services";

export const addRole = async (req: Request, res: Response) => {
  try {
    const role = await createRoleDb(req.body);
    return new APIResponse(res, httpStatus.CREATED, role).success();
  } catch (error) {
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await getRolesDb();
    return new APIResponse(res, httpStatus.OK, roles).success();
  } catch (error) {
    console.log("error", error);
    return new APIResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      apiResponseMessages.SOMETHING_WENT_WRONG
    ).failed();
  }
};
