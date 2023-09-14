import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

import { getUserInfo } from "api/user";

export const userKeys = createQueryKeys("user", {
  signIn: () => ({
    queryKey: ["signIn"],
  }),
  signUp: () => ({
    queryKey: ["signUp"],
  }),
  info: () => ({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  }),
  edit: () => ({
    queryKey: ["edit"],
  }),
});

export const categoryKeys = createQueryKeys("categories");

export const regionKeys = createQueryKeys("region", {
  all: () => ["all"],
  userRegions: () => ["userRegions"],
  select: () => ["select"],
});

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

export const transactionKeys = createQueryKeys("transactions", {
  list: (filters: { status?: "0" | "1,3" | "2" }) => ({
    queryKey: [filters],
  }),
});

export const wishlistKeys = createQueryKeys("wishlist", {
  list: (filters: { categoryId: number }) => ({
    queryKey: [filters],
  }),
});

export const queryKeys = mergeQueryKeys(
  categoryKeys,
  regionKeys,
  userKeys,
  productItemsKeys,
  transactionKeys,
  wishlistKeys
);

export default queryKeys;
