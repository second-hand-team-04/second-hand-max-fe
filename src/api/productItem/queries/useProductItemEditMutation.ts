import { useMutation } from "@tanstack/react-query";
import { ProductItemBody, putProductItem } from "api/productItem";
import { toast } from "react-hot-toast";
import { productItemsKeys } from "./queryKey";

export default function useProductItemEditMutation(id: number) {
  return useMutation({
    mutationKey: productItemsKeys.edit(id).queryKey,
    mutationFn: (body: ProductItemBody) => putProductItem(id, body),
    onSuccess: () => {
      toast.success("상품이 수정되었습니다");
    },
  });
}
