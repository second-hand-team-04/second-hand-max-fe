import { useMutation } from "@tanstack/react-query";
import { postImage } from "api/productItem";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useImageUploadMutation() {
  return useMutation({
    mutationKey: queryKeys.productItems.image().queryKey,
    mutationFn: (body: FormData) => postImage(body),
    onSuccess: () => {
      toast.success("상품이 등록되었습니다.");
    },
  });
}
