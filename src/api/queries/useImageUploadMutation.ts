import { useMutation } from "@tanstack/react-query";
import { postImageToS3 } from "api/productItem";
import queryKeys from "./queryKeys";

export default function useImageUploadMutation() {
  return useMutation({
    mutationKey: queryKeys.productItems.image().queryKey,
    mutationFn: (body: FormData) => postImageToS3(body),
  });
}
