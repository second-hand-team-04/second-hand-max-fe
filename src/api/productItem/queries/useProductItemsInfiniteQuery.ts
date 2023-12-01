import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductItems } from "api/productItem";
import { productItemsKeys } from "./queryKey";

export default function useProductItemsInfiniteQuery(filters: {
  regionId: number;
  categoryId: number;
}) {
  return useInfiniteQuery({
    queryKey: productItemsKeys.list(filters).queryKey,
    queryFn: (ctx) =>
      getProductItems({
        regionId: filters.regionId,
        categoryId: filters.categoryId,
        page: ctx.pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPageParam = lastPage.data.hasMore
        ? allPages.length + 1
        : undefined;
      return nextPageParam;
    },
  });
}
