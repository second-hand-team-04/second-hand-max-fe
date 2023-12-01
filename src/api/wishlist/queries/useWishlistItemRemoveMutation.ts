import { useMutation } from "@tanstack/react-query";
import { deleteWishlistItem } from "api/wishlist";
import toast from "react-hot-toast";
import { wishlistKeys } from "./queryKey";

export default function useWishlistItemRemoveMutation(id: number) {
  return useMutation({
    mutationKey: wishlistKeys.remove().queryKey,
    mutationFn: () => deleteWishlistItem(id),
    onSuccess: () => {
      toast.success("관심 목록에서 삭제되었습니다");
    },
  });
}
