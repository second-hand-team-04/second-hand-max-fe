import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProductItemStatus } from "api/productItem";
import { toast } from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useProductItemStatusEditMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.productItems.edit(id).queryKey,
    mutationFn: (body: { status: number }) => patchProductItemStatus(id, body),
    onSuccess: () => {
      toast.success("상품 상태가 수정되었습니다");

      queryClient.invalidateQueries(queryKeys.productItems.detail(id).queryKey);
    },
  });
}
