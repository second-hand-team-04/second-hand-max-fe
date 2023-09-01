import { fetcher } from "../fetcher";

export type User = {
  nickname: string;
  profileUrl: string;
};

export const postSignUp = async (body: FormData) => {
  return await fetcher.post<null>("/users/signup", body);
};
