import { useMutation } from "@tanstack/react-query";
import { postImageToS3 } from "api/productItem";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useImageUploadMutation() {
  return useMutation({
    mutationKey: queryKeys.productItems.image().queryKey,
    mutationFn: (body: FormData) => postImageToS3(body),
    onSuccess: () => {
      toast.success("상품이 등록되었습니다.");
    },
  });
}
