import { Schema, model } from "mongoose";
import { reviewModelInterface } from "@/interfaces";

const review = new Schema<reviewModelInterface>(
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
    comment: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Review = model<reviewModelInterface>("Review", review);
