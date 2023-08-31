import { fetcher, fetcherProtected } from "../fetcher";
import { CategoryType, User } from "./types";

// TODO: remove this
export const getUser = async () => {
  const res = await fetcherProtected.get<User>("/user");
  return res.data;
};

export const postSignUp = async (body: FormData) => {
  return await fetcher.post<null>("/users/signup", body);
};

export const getCategories = async () => {
  const res = await fetcher.get<CategoryType[]>("/categories");
  return res.data;
};
