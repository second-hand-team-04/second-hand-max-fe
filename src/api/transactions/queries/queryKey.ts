import { createQueryKeys } from "@lukemorales/query-key-factory";

export const transactionKeys = createQueryKeys("transactions", {
  list: (filters: { status?: "0" | "1,3" | "2" }) => ({
    queryKey: [filters],
  }),
});
