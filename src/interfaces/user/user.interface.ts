import { ObjectId } from "mongoose";

export interface userPayloadInterface {
  name: string;
  email: string;
  password: string;
}

export interface userModelInterface extends userPayloadInterface {
  _id: ObjectId;
  contact: Number;
  roles: Array<ObjectId | string>;
}

export interface userRequestPayload extends userModelInterface {
  createdAt: Date;
  updatedAt: Date;
}
