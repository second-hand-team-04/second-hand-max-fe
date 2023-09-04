import { Response } from "api/types";
import { fetcher } from "../fetcher";

export type User = {
  nickname: string;
  profileUrl: string;
};

export const postSignUp = async (body: FormData) => {
  return await fetcher.post<Response<null>>("/users/signup", body);
};
