import { rest } from "msw";
import { User } from "api/user/types";

export default [
  // TODO: remove this
  rest.get("/api/user", async (_, res, ctx) => {
    return res(ctx.status(400));
    return res(
      ctx.status(200),
      ctx.json<User>({ nickname: "kakamotobi", profileUrl: "" })
    );
  }),

  rest.post("/api/users/signin", async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(null));
  }),
];
