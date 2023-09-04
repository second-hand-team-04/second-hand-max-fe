import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

const userKeys = createQueryKeys("user");

const categoryKeys = createQueryKeys("categories");

const regionKeys = createQueryKeys("regionList");

const queryKeys = mergeQueryKeys(categoryKeys, regionKeys, userKeys);

export default queryKeys;
