import { ObjectId } from "mongoose";

export interface bookingModelInterface {
  user: ObjectId;
  tour: ObjectId;
  paymentStatus: string;
  paymentType: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface bookingInterface extends bookingModelInterface {
  _id: ObjectId;
}
