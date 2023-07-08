import { User } from "@/models";
import { userPayloadInterface } from "@/interfaces";
import { ObjectId } from "mongoose";

export const findUserDb = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findByIdUserDb = async (id: ObjectId) => {
  try {
    const user = await User.findById(id).select("-password");
    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signUpUserDb = async (userPayload: userPayloadInterface) => {
  try {
    const user = await User.create({
      ...userPayload,
    });
    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
