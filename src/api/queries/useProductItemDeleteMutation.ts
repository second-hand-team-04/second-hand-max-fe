import { useMutation } from "@tanstack/react-query";
import { deleteProductItem } from "api/productItem";
import { toast } from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useProductItemDeleteMutation(id: number) {
  return useMutation({
    mutationKey: queryKeys.productItems.delete(id).queryKey,
    mutationFn: deleteProductItem,
    onSuccess: () => {
      toast.success("상품이 삭제되었습니다.");
    },
  });
}
