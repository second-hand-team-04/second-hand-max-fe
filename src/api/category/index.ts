import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type CategoryType = {
  id: number;
  title: string;
  imageUrl: string;
};

export const getCategories = async () => {
  const res = await fetcher.get<Response<CategoryType[]>>("/categories");
  return res.data;
};
