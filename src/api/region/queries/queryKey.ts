import { createQueryKeys } from "@lukemorales/query-key-factory";

export const regionKeys = createQueryKeys("region", {
  list: (filters: { regionTitle?: string }) => ({
    queryKey: [filters],
  }),
  userRegions: () => ["userRegions"],
  select: () => ["select"],
});
