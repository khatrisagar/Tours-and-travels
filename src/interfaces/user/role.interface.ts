import { ObjectId } from "mongoose";

export interface roleModelInterface {
  name: string;
  permissions: Array<string>;
}

export interface roleInterface extends roleModelInterface {
  _id: ObjectId;
}
