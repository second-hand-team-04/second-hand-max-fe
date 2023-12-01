import { useQuery } from "@tanstack/react-query";
import { getWishlistItemsCategories } from "api/wishlist";
import { wishlistKeys } from "./queryKey";

export default function useWishlistItemsCategoriesQuery() {
  return useQuery({
    queryKey: wishlistKeys.categories().queryKey,
    queryFn: getWishlistItemsCategories,
    select: (res) => res.data,
    meta: {
      errorMessage: "관심 목록 카테고리 조회를 실패했습니다",
    },
  });
}
