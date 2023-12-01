import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserRegion } from "api/region";
import toast from "react-hot-toast";
import { regionKeys } from "./queryKey";

export default function useUserRegionPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: regionKeys.select().queryKey,
    mutationFn: (id: number) => postUserRegion(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: regionKeys.userRegions().queryKey,
      });
      toast.success(res.message);
    },
  });
}
