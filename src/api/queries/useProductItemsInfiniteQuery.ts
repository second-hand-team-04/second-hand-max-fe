import { useInfiniteQuery } from "@tanstack/react-query";

import queryKeys from "./queryKeys";
import { getProductItems } from "api/productItem";

export default function useProductItemsInfiniteQuery(filters: {
  regionId: number;
  categoryId: number;
}) {
  return useInfiniteQuery({
    queryKey: [queryKeys.item.list(filters).queryKey],
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
