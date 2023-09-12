import { useMutation } from "@tanstack/react-query";
import queryKeys from "./queryKeys";

import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { postProductItem } from "api/productItem";

export default function useProductItemMutation() {
  return useMutation({
    mutationKey: queryKeys.productItems.register().queryKey,
    mutationFn: postProductItem,
    onSuccess: () => {
      toast.success("상품이 등록되었습니다.");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    },
  });
}
