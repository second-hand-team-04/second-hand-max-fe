import { useInfiniteQuery } from "@tanstack/react-query";
import { getWishlistItems } from "api/wishlist";
import queryKeys from "./queryKeys";

export default function useWishlistItemsInfiniteQuery(filters: {
  categoryId: number;
}) {
  return useInfiniteQuery({
    queryKey: [queryKeys.wishlist.list(filters).queryKey],
    queryFn: (ctx) =>
      getWishlistItems({
        categoryId: filters.categoryId,
        page: ctx.pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPageParam = lastPage.data.hasMore
        ? allPages.length + 1
        : undefined;
      return nextPageParam;
    },
    cacheTime: 0,
  });
}
