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
  all: ["all"],
  userRegions: ["userRegions"],
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
  wishlistKeys
);

export default queryKeys;
