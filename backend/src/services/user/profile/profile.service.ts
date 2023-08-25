import { userModelInterface, userPayloadInterface } from "@/interfaces";
import { User } from "@/models";

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
