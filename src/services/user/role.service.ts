import { Role } from "@/models";
import { ObjectId } from "mongoose";

export const createRoleDb = async (rolePayload: any) => {
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
    const role = await Role.aggregate([
      {
        $unwind: "$permissions",
      },
    ]);
    // .match({ permissions: "" });
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getSingleRoleDb = async (roles: Array<ObjectId>, name: string) => {
  try {
    const role = await Role.find().where({
      $and: [
        {
          _id: { $in: roles },
        },
        {
          name: name,
        },
      ],
    });
    console.log(role);
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
