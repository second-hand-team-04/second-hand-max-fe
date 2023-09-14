import { useMutation } from "@tanstack/react-query";
import queryKeys from "./queryKeys";

import { postProductItem } from "api/productItem";
import { toast } from "react-hot-toast";

export default function useProductItemMutation() {
  return useMutation({
    mutationKey: queryKeys.productItems.register().queryKey,
    mutationFn: postProductItem,
    onSuccess: () => {
      toast.success("상품이 등록되었습니다.");
    },
  });
}
