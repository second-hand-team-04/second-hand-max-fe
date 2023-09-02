import { rest } from "msw";
import { categoriesData, regionListData } from "./data";

export default [
  rest.post("/api/users/signin", async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(null));
  }),

  rest.get("/api/categories", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoriesData));
  }),

  rest.get("/api/regions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(regionListData));
  }),
];
