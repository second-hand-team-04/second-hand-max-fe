import { useMutation } from "@tanstack/react-query";
import { postWishlistItem } from "api/wishlist";
import toast from "react-hot-toast";
import { wishlistKeys } from "./queryKey";

export default function useWishlistItemAddMutation(id: number) {
  return useMutation({
    mutationKey: wishlistKeys.add().queryKey,
    mutationFn: () => postWishlistItem(id),
    onSuccess: () => {
      toast.success("관심 목록에 추가되었습니다");
    },
  });
}
