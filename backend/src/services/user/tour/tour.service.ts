import { apiFeatureQuerystringInterface } from "@/interfaces";
import { Tour } from "@/models";
import { APIFeature } from "@/utils";
import { ObjectId } from "mongoose";

export const getToursDb = async (
  queryString: apiFeatureQuerystringInterface
) => {
  try {
    const allowedSearchFields: any = [
      {
        field: "name",
        type: "string",
      },
      { field: "price", type: "number" },
    ];
    const tourFeatures = new APIFeature(
      Tour.find({ isTourActive: true }),
      queryString
    )
      .sort()
      .filter(allowedSearchFields);
    const count = await tourFeatures.query.clone().count();
    const toursInfo = await tourFeatures.pagination().query;
    const pagination = {
      itemCount: toursInfo.length,
      count,
      page: tourFeatures.page,
      limit: tourFeatures.limit,
      skip: tourFeatures.skip,
    };
    return { toursInfo, pagination };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getTourByIdDb = async (tourId: string | ObjectId) => {
  try {
    const tour = await Tour.findById(tourId)
      .where({ isTourActive: true })
      .populate({ path: "reviews" });
    return tour;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
