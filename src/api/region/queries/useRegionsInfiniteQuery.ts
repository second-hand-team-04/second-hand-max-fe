import { useInfiniteQuery } from "@tanstack/react-query";
import { getRegions } from "api/region";
import { regionKeys } from "./queryKey";

export default function useRegionsInfiniteQuery(regionTitle?: string) {
  return useInfiniteQuery({
    queryKey: regionKeys.list({ regionTitle }).queryKey,
    queryFn: (ctx) =>
      getRegions({
        page: ctx.pageParam,
        regionTitle,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPageParam = lastPage.data.hasMore
        ? allPages.length + 1
        : undefined;
      return nextPageParam;
    },
  });
}
