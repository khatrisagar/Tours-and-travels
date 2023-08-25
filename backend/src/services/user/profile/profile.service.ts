import { userModelInterface, userPayloadInterface } from "@/interfaces";
import { User } from "@/models";

export const getUserProfileDb = async (userId: string) => {
  try {
    const user = User.findById(userId).populate({ path: "roles" });

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const updateUserProfileDb = async (userId: string, userPayload: any) => {
  try {
    const user = User.findByIdAndUpdate(userId, userPayload, {
      new: true,
    });

    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
