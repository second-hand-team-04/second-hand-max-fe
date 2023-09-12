import { RestRequest, rest } from "msw";
import {
  successfulAllRegionsData,
  successfulCategoriesData,
  successfulItemListData,
  successfulRefreshAccessToken,
  successfulSignInData,
  successfulSignOutData,
  successfulSignUpData,
  successfulUserInfoData,
  successfulUserRegionSelectData,
  successfulUserRegionsData,
  unSuccessfulItemListData,
  unSuccessfulRefreshAccessToken,
  unSuccessfulSignUpData,
  unsuccessfulSignInData,
  unsuccessfulUserInfoData,
} from "./data";

const isAuthorized = (req: RestRequest) => {
  return !!req.headers.get("Authorization");
};

export default [
  rest.post("/api/users/signup", async (_, res, ctx) => {
    return res(ctx.status(400), ctx.json(unSuccessfulSignUpData));
    return res(ctx.status(201), ctx.json(successfulSignUpData));
  }),

  rest.post("/api/auth", async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === "d@d.com" && password === "hello123!") {
      return res(ctx.status(200), ctx.json(successfulSignInData));
    }
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

  rest.get("/api/users/info", async (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(400), ctx.json(unsuccessfulUserInfoData));
    }
    return res(ctx.status(200), ctx.json(successfulUserInfoData));
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

    const updatedRegions = currentRegionListData.regions.filter(
      (region) => region.id !== id
    );
    return res(ctx.status(200), ctx.json(updatedRegions));
  }),
];
