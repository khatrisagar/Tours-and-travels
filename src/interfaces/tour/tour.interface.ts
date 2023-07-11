import { ObjectId } from "mongoose";
import { reviewModelInterface } from "./review.interface";

export interface loacationCoveredInterface {
  name: string;
  details: string;
  day: number;
  includedMeals: string;
}

export interface tourModelInterface {
  name: string;
  startDate: Date;
  endDate: Date;
  price: number;
  description: string;
  coverImage: string;
  images: Array<string>;
  isTourActive: boolean;
  locationsCovered: Array<loacationCoveredInterface>;
  organizer: ObjectId;
  reviews: Array<reviewModelInterface>;
}
