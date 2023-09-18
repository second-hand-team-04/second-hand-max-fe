import { HTTPSTATUS } from "api/types";
import {
  successfulTransactionItemsData,
  successfulUserInfoData,
  successfulUserRegionSelectData,
  successfulUserRegionsData,
  successfulWishlistItemAdd,
  successfulWishlistItemDelete,
  successfulWishlistItemsData,
  unSuccessfulUserInfoData,
} from "mocks/data";
import { RestRequest, rest } from "msw";

export default [
  rest.get("/api/users/info", async (req, res, ctx) => {
    const isAuthorized = (req: RestRequest) => {
      return !!req.headers.get("Authorization");
    };
    if (!isAuthorized(req)) {
      return res(
        ctx.status(HTTPSTATUS.badRequest),
        ctx.json(unSuccessfulUserInfoData)
      );
    }
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulUserInfoData)
    );
  }),

  rest.get("/api/users/regions", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulUserRegionsData)
    );
  }),

  rest.patch("/api/users/regions/:id", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulUserRegionSelectData)
    );
  }),

  rest.delete("/api/users/regions/:id", (req, res, ctx) => {
    const currentRegionListData = successfulUserRegionsData.data;

    const id = Number(req.params.id);

    const updatedRegions = currentRegionListData.regions.filter(
      (region) => region.id !== id
    );
    return res(ctx.status(HTTPSTATUS.success), ctx.json(updatedRegions));
  }),

  rest.get(
    "/api/users/transactions?status=1,3&page=0&size=0",
    (_, res, ctx) => {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulTransactionItemsData)
      );
    }
  ),

  rest.get("/api/users/wishlist?category=1&page=0&size=0", (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulWishlistItemsData)
    );
  }),

  rest.post("/api/users/wishlist/:itemId", (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.created),
      ctx.json(successfulWishlistItemAdd)
    );
  }),

  rest.delete("/api/users/wishlist/:itemId", (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulWishlistItemDelete)
    );
  }),
];
