import { useInfiniteQuery } from "@tanstack/react-query";

import { getTransactions } from "api/transactions";
import queryKeys from "./queryKeys";

export default function useTransactionsInfiniteQuery(filters: {
  status?: "0" | "1,3" | "2";
}) {
  return useInfiniteQuery({
    queryKey: [queryKeys.transactions.list(filters).queryKey],
    queryFn: (ctx) =>
      getTransactions({
        status: filters.status === "0" ? undefined : filters.status,
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
