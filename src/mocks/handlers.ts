import { HTTPSTATUS } from "api/types";
import { rest } from "msw";
import { successfulAllRegionsData, successfulCategoriesData } from "./data";
import authHandlers from "./handlers/authHandlers";
import productItemHandlers from "./handlers/productItemHandlers";
import userHandlers from "./handlers/userHandlers";

export default [
  ...authHandlers,
  ...userHandlers,
  ...productItemHandlers,

  rest.get("/api/categories", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulCategoriesData)
    );
  }),

  rest.get("/api/regions", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulAllRegionsData)
    );
  }),
];
