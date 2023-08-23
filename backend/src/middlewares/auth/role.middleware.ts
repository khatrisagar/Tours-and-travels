import { APIResponse } from "@/utils";
import { Request, Response, NextFunction } from "express";

import { httpStatus, apiResponseMessages } from "enums";
import { getSingleRoleDb } from "@/services";
import { roleModelInterface, userRequestPayload } from "@/interfaces";

export const routeProtection = (permissions: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getUserRole: Array<roleModelInterface> = await getSingleRoleDb(
        (req as Request & { user: userRequestPayload }).user.roles
      );
      const roles: Array<string> = getUserRole.map(
        (role: roleModelInterface) => role.name
      );
      (req as Request & { roles: Array<string> }).roles = roles;
      if (getUserRole.length) {
        const isUserHavePermissions = getUserRole.map(
          (role: roleModelInterface) => {
            return permissions.every((permission: string) => {
              if (role.permissions.includes(permission)) {
                return true;
              } else {
                return false;
              }
            });
          }
        );
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
