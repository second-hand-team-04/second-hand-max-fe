import { rest } from "msw";
import {
  categoriesData,
  regionListData,
  successfulSignInData,
  successfulSignUpData,
  unSuccessfulSignUpData,
  unsuccessfulSignInData,
  successfulUserInfoData,
  unsuccessfulUserInfoData,
  successfulRefreshAccessToken,
  unSuccessfulRefreshAccessToken,
} from "./data";

export default [
  rest.post("/api/users/signup", async (_, res, ctx) => {
    return res(ctx.status(400), ctx.json(unSuccessfulSignUpData));
    return res(ctx.status(201), ctx.json(successfulSignUpData));
  }),

  rest.post("/api/auth", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulSignInData));
    return res(ctx.status(401), ctx.json(unsuccessfulSignInData));
  }),

  rest.get("/api/auth/refresh", async (_, res, ctx) => {
    return res(ctx.status(401), ctx.json(unSuccessfulRefreshAccessToken));
    return res(ctx.status(200), ctx.json(successfulRefreshAccessToken));
  }),

  rest.get("/api/users/info", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulUserInfoData));
    return res(ctx.status(400), ctx.json(unsuccessfulUserInfoData));
  }),

  rest.get("/api/categories", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoriesData));
  }),

  rest.get("/api/regions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(regionListData));
  }),
];
