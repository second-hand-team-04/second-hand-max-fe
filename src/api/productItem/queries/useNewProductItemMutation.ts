import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductItem } from "api/productItem";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { productItemsKeys } from "./queryKey";

export default function useNewProductItemMutation(filters: {
  regionId: number;
  categoryId: number;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: productItemsKeys.register().queryKey,
    mutationFn: postProductItem,
    onSuccess: (res) => {
      toast.success("상품이 등록되었습니다");
      queryClient.invalidateQueries(productItemsKeys.list(filters).queryKey);

      navigate(`/product/${res.data.id}`);
    },
  });
}
