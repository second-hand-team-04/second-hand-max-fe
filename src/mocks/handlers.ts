import { RestRequest, rest } from "msw";
import {
  successfulItemListData,
  regionListData,
  successfulCategoriesData,
  successfulMyRegionListData,
  successfulSignInData,
  successfulSignUpData,
  unSuccessfulSignUpData,
  unsuccessfulSignInData,
  successfulUserInfoData,
  unsuccessfulUserInfoData,
  successfulRefreshAccessToken,
  unSuccessfulRefreshAccessToken,
  successfulSignOutData,
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
    return res(ctx.status(200), ctx.json(regionListData));
  }),

  rest.get("/api/items?region=1&category=1", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulItemListData));
  }),

  rest.get("/api/users/regions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulMyRegionListData));
  }),

  rest.delete("/api/users/regions/:id", (req, res, ctx) => {
    const currentRegionListData = successfulMyRegionListData.data;

    const id = Number(req.params.id);

    const updatedRegions = currentRegionListData.filter(
      (region) => region.id !== id
    );
    return res(ctx.status(200), ctx.json(updatedRegions));
  }),
];
