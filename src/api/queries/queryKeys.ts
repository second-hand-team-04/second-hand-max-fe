// export const userKeys = {
//   user: ["user"] as const,
// };

// export const categoryKeys = {
//   categories: ["categories"] as const,
// };

// export const regionKeys = {
//   regionList: ["regionList"] as const,
// };

import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("user");

// my-api/categories.ts
export const categoryKeys = createQueryKeys("categories");

// my-api/regions.ts
export const regionKeys = createQueryKeys("regionList");

export const queryKeys = mergeQueryKeys(categoryKeys, regionKeys, userKeys);
