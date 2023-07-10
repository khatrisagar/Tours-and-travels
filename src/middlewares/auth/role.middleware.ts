import { APIResponse } from "@/utils";
import { Request, Response, NextFunction } from "express";

import { httpStatus, apiResponseMessages } from "enums";
import { getSingleRoleDb } from "@/services";

export const routeProtection = (permissions: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getUserRole: any = await getSingleRoleDb((req as any).user.roles);
      const roles: Array<string> = getUserRole.map((role: any) => role.name);
      (req as Request & { roles: any }).roles = roles;
      if (getUserRole.length) {
        const isUserHavePermissions = getUserRole.map((role: any) => {
          return permissions.every((permission: Array<string>) => {
            if (role.permissions.includes(permission)) {
              return true;
            } else {
              return false;
            }
          });
        });
        if (isUserHavePermissions.includes(true)) {
          return next();
        } else {
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
};
