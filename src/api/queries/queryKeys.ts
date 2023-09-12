import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";
// import { ProductItemFilter } from "api/types";
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

export const ProductItemsKeys = createQueryKeys("productItems", {
  detail: (itemId: number) => [itemId],
  list: (filters: { regionId: number; categoryId: number }) => ({
    queryKey: [filters],
  }),
  register: () => ({
    queryKey: ["registration"],
  }),
});

export const queryKeys = mergeQueryKeys(
  categoryKeys,
  regionKeys,
  userKeys,
  ProductItemsKeys
);

export default queryKeys;
