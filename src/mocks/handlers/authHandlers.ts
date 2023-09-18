import {
  successfulRefreshAccessToken,
  successfulSignInData,
  successfulSignOutData,
  successfulSignUpData,
  unSuccessfulRefreshAccessToken,
  unSuccessfulSignInData,
  unSuccessfulSignUpData,
} from "mocks/data";
import { rest } from "msw";

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
    return res(ctx.status(401), ctx.json(unSuccessfulSignInData));
  }),

  rest.get("/api/auth/oauth/kakao?code=blah", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulSignInData));
    return res(ctx.status(401), ctx.json(unSuccessfulSignInData));
  }),

  rest.delete("/api/auth", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(successfulSignOutData));
  }),

  rest.get("/api/auth/refresh", async (_, res, ctx) => {
    return res(ctx.status(401), ctx.json(unSuccessfulRefreshAccessToken));
    return res(ctx.status(200), ctx.json(successfulRefreshAccessToken));
  }),
];
