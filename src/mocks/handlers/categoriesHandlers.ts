import { HTTPSTATUS } from "api/types";
import { successfulCategoriesData } from "mocks/data/categoriesData";
import { rest } from "msw";

export default [
  rest.get("/api/categories", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulCategoriesData)
    );
  }),
];
