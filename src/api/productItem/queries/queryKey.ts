import { createQueryKeys } from "@lukemorales/query-key-factory";

export const productItemsKeys = createQueryKeys("productItems", {
  detail: (itemId: number) => [itemId],
  list: (filters: { regionId: number; categoryId: number }) => ({
    queryKey: [filters],
  }),
  register: () => ({
    queryKey: ["register"],
  }),
  edit: (itemId: number) => ({
    queryKey: [itemId],
  }),
  delete: (itemId: number) => ({
    queryKey: [itemId],
  }),
  image: () => ({
    queryKey: ["image"],
  }),
});
