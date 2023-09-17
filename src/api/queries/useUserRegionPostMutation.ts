import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserRegion } from "api/region";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useUserRegionPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.region.select().queryKey,
    mutationFn: (id: number) => postUserRegion(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.region.userRegions().queryKey,
      });
      toast.success(res.message);
    },
  });
}
