import { Schema, model } from "mongoose";

const review = new Schema<any>(
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

export const Review = model("Review", review);
