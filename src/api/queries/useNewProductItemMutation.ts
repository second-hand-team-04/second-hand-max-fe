import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductItem } from "api/productItem";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import queryKeys from "./queryKeys";

export default function useNewProductItemMutation(filters: {
  regionId: number;
  categoryId: number;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.productItems.register().queryKey,
    mutationFn: postProductItem,
    onSuccess: (res) => {
      toast.success("상품이 등록되었습니다");
      queryClient.invalidateQueries(
        queryKeys.productItems.list(filters).queryKey
      );

      console.log(res.data.id);
      navigate(`/product/${res.data.id}`);
    },
  });
}
