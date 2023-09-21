import { HTTPSTATUS } from "api/types";
import { successfulAllRegionsData } from "mocks/data/regionsData";
import { rest } from "msw";

export default [
  rest.get("/api/regions", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulAllRegionsData)
    );
  }),
];
