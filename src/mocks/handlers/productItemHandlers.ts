import {
  successfulProductItemsData,
  unSuccessfulProductItemsData,
} from "mocks/data";
import { rest } from "msw";

export default [
  rest.get(
    "/api/items?region=1&category=1&page=0&size=10",
    async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(successfulProductItemsData));
      return res(ctx.status(400), ctx.json(unSuccessfulProductItemsData));
    }
  ),

  rest.get("/api/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    console.log(id);
    const item = successfulProductItemsData.data.items.find(
      (product) => product.id === Number(id)
    );

    if (item) {
      return res(
        ctx.status(200),
        ctx.json({
          ...successfulProductItemsData,
          data: item,
        })
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          code: 404,
          status: "Not Found",
          message: "상품을 찾을 수 없습니다",
          data: null,
        })
      );
    }
  }),
];
