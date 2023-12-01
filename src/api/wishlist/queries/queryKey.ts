import { createQueryKeys } from "@lukemorales/query-key-factory";

export const wishlistKeys = createQueryKeys("wishlist", {
  list: (filters: { categoryId: number }) => ({
    queryKey: [filters],
  }),
  categories: () => ({
    queryKey: ["categories"],
  }),
  add: () => ({
    queryKey: ["add"],
  }),
  remove: () => ({
    queryKey: ["remove"],
  }),
});
