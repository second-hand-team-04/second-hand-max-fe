import { fetcher } from "api/fetcher";
import { CategoryType } from "./types";
import { Response } from "api/types";

export const getCategories = async (): Promise<Response<CategoryType[]>> => {
  const res = await fetcher.get("/categories");
  return res.data;
};
