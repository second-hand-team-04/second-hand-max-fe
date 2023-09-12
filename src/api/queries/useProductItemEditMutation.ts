import { useMutation } from "@tanstack/react-query";
import { ProductItemBody, putProductItem } from "api/productItem";
import { toast } from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useProductItemEditMutation(
  id: number,
  body: ProductItemBody
) {
  return useMutation({
    mutationKey: queryKeys.productItems.edit(id).queryKey,
    mutationFn: () => putProductItem(id, body),
    onSuccess: () => {
      toast.success("상품이 수정되었습니다.");
    },
  });
}
