// roleInfo
import { User } from "@/models";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  console.log("usssss");
  const user = await User.find();
  res.json({ user });
};
