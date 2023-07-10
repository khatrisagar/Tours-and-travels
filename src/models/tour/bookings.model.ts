import { Schema, model } from "mongoose";

const booking = new Schema<any>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tour: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tour",
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["completed", "pending"],
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["cash", "online"],
    },
  },
  { timestamps: true }
);

export const Booking = model("Booking", booking);
