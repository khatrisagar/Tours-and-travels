import { reviewModelInterface, tourModelInterface } from "@/interfaces";
import { Schema, model } from "mongoose";

const tour = new Schema<tourModelInterface>(
  {
    name: {
      type: String,
      required: [true, "Name Should not be empty"],
    },
    startDate: {
      type: Date,
      required: [true, "Date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "Date is required"],
    },
    price: {
      type: Number,
      required: [true, "Price Should not be empty"],
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    isTourActive: { type: Boolean, required: false, default: false },
    locationsCovered: [
      {
        name: { type: String, required: true },
        details: { type: String, required: true },
        day: { type: Number, required: true },
        includedMeals: {
          type: [String],
          required: true,
          enum: ["Break Fast", "Lunch", "Dinner"],
        },
      },
    ],
    organizer: { type: Schema.Types.ObjectId, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tour.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tour",
});

tour.virtual("avgRating").get(function () {
  let ratings: Array<number> = [];
  if (this.reviews.length) {
    console.log("s", this.reviews);
    this.reviews.forEach((review: reviewModelInterface) =>
      ratings.push(review.rating)
    );
    return (
      ratings?.reduce((a: number, b: number) => a + b) / ratings.length
    ).toFixed(1);
  }
});

export const Tour = model<tourModelInterface>("Tour", tour);
