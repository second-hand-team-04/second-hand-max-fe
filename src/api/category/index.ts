import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type CategoryType = {
  id: number;
  title: string;
  imageUrl: string;
};

export const getCategories = async (): Promise<Response<CategoryType[]>> => {
  const res = await fetcher.get("/categories");
  return res.data;
};
