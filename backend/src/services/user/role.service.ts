import { roleInterface } from "@/interfaces";
import { Role } from "@/models";
import { ObjectId } from "mongoose";

export const createRoleDb = async (rolePayload: roleInterface) => {
  try {
    const role = await Role.create(rolePayload);
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getRolesDb = async () => {
  try {
    // const role = await Role.find();
    const role = await Role.find();
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getSingleRoleDb = async (roles: Array<ObjectId>) => {
  try {
    const role = await Role.find().where({
      $and: [
        {
          _id: { $in: roles },
        },
      ],
    });
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
