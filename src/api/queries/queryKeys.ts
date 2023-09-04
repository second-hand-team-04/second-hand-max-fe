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
});

export const categoryKeys = createQueryKeys("categories");

export const regionKeys = createQueryKeys("regionList");

export const queryKeys = mergeQueryKeys(categoryKeys, regionKeys, userKeys);

export default queryKeys;
