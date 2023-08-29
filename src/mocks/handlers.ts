import { rest } from "msw";

export default [
  rest.get("/api/user", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "goat" }));
  }),
];
