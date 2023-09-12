import { useMutation } from "@tanstack/react-query";
import queryKeys from "./queryKeys";

import { PostProductItemBody, putProductItem } from "api/productItem";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function useProductItemEditMutation(
  id: number,
  body: PostProductItemBody
) {
  return useMutation({
    mutationKey: queryKeys.productItems.edit(id).queryKey,
    mutationFn: () => putProductItem(id, body),
    onSuccess: () => {
      toast.success("상품이 수정되었습니다.");
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
