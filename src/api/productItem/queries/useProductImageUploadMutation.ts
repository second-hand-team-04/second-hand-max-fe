import { useMutation } from "@tanstack/react-query";
import { postImageToS3 } from "api/productItem";
import { productItemsKeys } from "./queryKey";

export default function useProductImageUploadMutation() {
  return useMutation({
    mutationKey: productItemsKeys.image().queryKey,
    mutationFn: (body: FormData) => postImageToS3(body),
  });
}
