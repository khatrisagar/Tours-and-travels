import { ObjectId } from "mongoose";

export interface reviewModelInterface {
  user: ObjectId;
  tour: ObjectId;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
