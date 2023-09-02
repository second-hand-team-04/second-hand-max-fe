import { rest } from "msw";
import {
  categoriesData,
  regionListData,
  successfulSignInData,
  unsuccessfulSignInData,
} from "./data";

export default [
  rest.post("/api/users/signup", async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(null));
  }),

  rest.post("/api/auth", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(unsuccessfulSignInData));
    return res(ctx.status(200), ctx.json(successfulSignInData));
  }),

  rest.get("/api/categories", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoriesData));
  }),

  rest.get("/api/regions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(regionListData));
  }),
];
