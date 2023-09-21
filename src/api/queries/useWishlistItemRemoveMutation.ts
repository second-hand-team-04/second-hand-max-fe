import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlistItem } from "api/wishlist";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useWishlistItemRemoveMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.wishlist.remove().queryKey,
    mutationFn: () => deleteWishlistItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.productItems.detail(id).queryKey);
      toast.success("관심 목록에서 삭제되었습니다");
    },
  });
}
