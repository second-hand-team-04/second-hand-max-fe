import { fetcher } from "api/fetcher";
import { AxiosResponse } from "axios";
import { CategoryType } from "./types";

export const getCategories = async () => {
  const res = await fetcher.get<AxiosResponse<CategoryType[]>>("/categories");
  return res.data;
};
