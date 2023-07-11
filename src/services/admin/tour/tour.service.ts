import { tourModelInterface } from "@/interfaces";
import { Tour } from "@/models";

export const getAdminToursDb = async () => {
  try {
    const tours = await Tour.find();
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAdminTourByIdDb = async (tourId: string) => {
  try {
    const tour = await Tour.findById(tourId);
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
    });
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
