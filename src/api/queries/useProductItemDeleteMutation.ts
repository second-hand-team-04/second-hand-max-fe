import { useMutation } from "@tanstack/react-query";
import { deleteProductItem } from "api/productItem";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import queryKeys from "./queryKeys";

export default function useProductItemDeleteMutation(id: number) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: queryKeys.productItems.delete(id).queryKey,
    mutationFn: deleteProductItem,
    onSuccess: () => {
      toast.success("상품이 삭제되었습니다");
      navigate(-1);
    },
    meta: {
      errorMessage: "상품 삭제를 실패했습니다",
    },
  });
}
