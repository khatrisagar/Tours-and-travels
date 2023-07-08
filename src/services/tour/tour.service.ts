import { Tour } from "@/models";

export const getToursDb = async () => {
  try {
    const tours = await Tour.find();
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const addToursDb = async (payload: any) => {
  try {
    const tours = await Tour.create(payload);
    return tours;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
