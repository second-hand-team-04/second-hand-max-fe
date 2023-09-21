import { useQuery } from "@tanstack/react-query";
import { getWishlistItemsCategories } from "api/wishlist";
import queryKeys from "./queryKeys";

export default function useWishlistItemsCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.wishlist.categories().queryKey,
    queryFn: getWishlistItemsCategories,
    select: (res) => res.data,
    meta: {
      errorMessage: "관심 목록 카테고리 조회를 실패했습니다",
    },
  });
}
