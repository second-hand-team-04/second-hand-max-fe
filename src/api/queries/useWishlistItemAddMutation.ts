import { useMutation } from "@tanstack/react-query";
import { postWishlistItem } from "api/wishlist";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useWishlistItemAddMutation(id: number) {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.wishlist.add().queryKey,
    mutationFn: () => postWishlistItem(id),
    onSuccess: () => {
      // queryClient.invalidateQueries(queryKeys.productItems.detail(id).queryKey);
      toast.success("관심 목록에 추가되었습니다");
    },
  });
}
