import { createQueryKeys } from "@lukemorales/query-key-factory";

export const categoryKeys = createQueryKeys("categories", {
  list: () => ({
    queryKey: ["list"],
  }),
});
