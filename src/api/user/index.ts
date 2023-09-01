import { fetcher } from "../fetcher";

export const postSignUp = async (body: FormData) => {
  return await fetcher.post<null>("/users/signup", body);
};
