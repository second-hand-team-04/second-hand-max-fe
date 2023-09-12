import { rest } from "msw";
import {
  successfulItemListData,
  successfulAllRegionsData,
  successfulCategoriesData,
  successfulUserRegionsData,
  successfulSignInData,
  successfulSignUpData,
  successfulUserInfoData,
  successfulRefreshAccessToken,
  successfulSignOutData,
  unSuccessfulSignUpData,
  unsuccessfulSignInData,
  unsuccessfulUserInfoData,
  unSuccessfulRefreshAccessToken,
  unSuccessfulItemListData,
  successfulUserRegionSelectData,
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

  rest.get("/api/auth/oauth/kakao?code=blah", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulSignInData));
    return res(ctx.status(401), ctx.json(unsuccessfulSignInData));
  }),

  rest.delete("/api/auth", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulSignOutData));
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
    return res(ctx.status(200), ctx.json(successfulCategoriesData));
  }),

  rest.get("/api/regions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulAllRegionsData));
  }),

  rest.get(
    "/api/items?region=1&category=1&page=0&size=10",
    async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(successfulItemListData));
      return res(ctx.status(400), ctx.json(unSuccessfulItemListData));
    }
  ),

  rest.get("/api/users/regions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulUserRegionsData));
  }),

  rest.patch("/api/users/regions/:id", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulUserRegionSelectData));
  }),

  rest.delete("/api/users/regions/:id", (req, res, ctx) => {
    const currentRegionListData = successfulUserRegionsData.data;

    const id = Number(req.params.id);

    const updatedRegions = currentRegionListData.items.filter(
      (region) => region.id !== id
    );
    return res(ctx.status(200), ctx.json(updatedRegions));
  }),
];
