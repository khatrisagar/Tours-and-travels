import {
  apiFeatureQuerystringInterface,
  tourModelInterface,
} from "@/interfaces";
import { Tour } from "@/models";
import { APIFeature } from "@/utils";

export const getAdminToursDb = async (
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
      Tour.find().populate({ path: "reviews" }),
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

export const getAdminTourByIdDb = async (tourId: string) => {
  try {
    const tour = await Tour.findById(tourId).populate({ path: "reviews" });
    return tour;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const addToursDb = async (payload: tourModelInterface) => {
  try {
    const tours = await Tour.create(payload);
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateToursDb = async (
  tourId: string,
  tourPayload: tourModelInterface
) => {
  try {
    const tour = await Tour.findByIdAndUpdate(tourId, tourPayload, {
      new: true,
    }).populate({ path: "reviews" });
    return tour;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const deleteToursDb = async (tourId: string) => {
  try {
    const tour = await Tour.findByIdAndDelete(tourId);
    return tour;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
