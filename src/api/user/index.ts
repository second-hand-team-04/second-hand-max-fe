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
  id: number;
  nickname: string;
  imageUrl: string;
};

export type OAuthProvider = "kakao";

type AccessTokenData = {
  accessToken: string;
};

export const postSignUp = async (body: FormData) => {
  const res = await fetcher.post<Response<null>>("/users", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const postSignIn = async (body: SignInCredentials) => {
  const res = await fetcher.post<Response<SignInData>>("/auth", body);
  return res.data;
};

export const getOAuthSignIn = async (
  provider: OAuthProvider,
  authCode: string
) => {
  const res = await fetcher.get<Response<SignInData>>(
    `/auth/oauth/${provider}?code=${authCode}`
  );
  return res.data;
};

export const deleteSignOut = async () => {
  const res = await fetcher.delete<Response<null>>("/auth");
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

export const getUserInfo = async () => {
  const res = await fetcher.get<Response<User>>("/users/info");
  return res.data;
};

export const patchUserInfo = async (body: FormData) => {
  const res = await fetcher.patch<Response<null>>("/users/info", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
