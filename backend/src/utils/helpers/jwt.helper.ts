import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
require("dotenv").config({ path: "./.env" });

const createJWTToken = (id: ObjectId) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded;
};

export { createJWTToken, verifyToken };
