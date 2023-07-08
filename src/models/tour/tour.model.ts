import { Schema, model } from "mongoose";

const tour = new Schema<any>({
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
  ratings: {
    type: [Schema.Types.ObjectId],
    ref: "Rating",
    default: [],
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
});

export const Tour = model("Tour", tour);
