import { Response } from "api/types";
import { fetcher } from "../fetcher";

export type SignInCredentials = {
  email: string;
  password: string;
};

type SignInData = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  nickname: string;
  profileImageUrl: string;
};

type AccessTokenData = {
  accessToken: string;
};

export const postSignUp = async (body: FormData) => {
  const res = await fetcher.post<Response<null>>("/users/signup", body);
  return res.data;
};

export const postSignIn = async (body: SignInCredentials) => {
  const res = await fetcher.post<Response<SignInData>>("/auth", body);
  return res.data;
};

export const getUserInfo = async () => {
  const res = await fetcher.get<Response<User>>("/users/info");
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await fetcher.get<Response<AccessTokenData>>("/auth/refresh", {
    headers: {
      Authorization: localStorage.getItem("refreshToken"),
    },
  });
  return res.data;
};
