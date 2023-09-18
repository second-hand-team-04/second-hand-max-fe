import { HTTPSTATUS } from "api/types";

export const successfulSignInData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "로그인을 성공했습니다",
  data: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    user: {
      id: 1,
      nickname: "Kakamotobi",
      profileImageUrl: "blah",
    },
  },
};

export const unSuccessfulSignInData = {
  code: HTTPSTATUS.unAuthorized,
  status: "Unauthenticated",
  message: "이메일 또는 비밀번호가 일치하지 않습니다",
  data: null,
};

export const successfulSignUpData = {
  code: HTTPSTATUS.created,
  status: "OK",
  message: "회원가입을 성공했습니다",
  data: null,
};

export const unSuccessfulSignUpData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "회원가입을 실패했습니다",
  data: null,
};

export const successfulSignOutData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "로그아웃을 성공했습니다",
  data: null,
};

export const successfulRefreshAccessToken = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "Access Token 발급을 성공했습니다",
  data: {
    accessToken: "accessToken",
  },
};

export const unSuccessfulRefreshAccessToken = {
  code: HTTPSTATUS.unAuthorized,
  status: "Bad Request",
  message: "Access Token 발급을 실패했습니다",
  data: null,
};
