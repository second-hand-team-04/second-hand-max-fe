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

export const ItemKeys = createQueryKeys("items");

export const queryKeys = mergeQueryKeys(
  categoryKeys,
  regionKeys,
  userKeys,
  ItemKeys
);

export default queryKeys;
