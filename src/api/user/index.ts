import { Response } from "api/types";
import { fetcher } from "../fetcher";

type SignInData = {
  accessToken: string;
  refreshToken: string;
  user: {
    nickname: string;
    profilePicture: string;
  };
};

export const postSignUp = async (body: FormData) => {
  const res = await fetcher.post<Response<null>>("/users/signup", body);
  return res.data;
};

export const postSignIn = async (body: { email: string; password: string }) => {
  const res = await fetcher.post<Response<SignInData>>("/api/auth", body);
  return res.data;
};
