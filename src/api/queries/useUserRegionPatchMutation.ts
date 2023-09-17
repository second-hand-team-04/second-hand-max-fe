import { useMutation } from "@tanstack/react-query";
import { patchUserRegion } from "api/region";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useUserRegionPatchMutation() {
  return useMutation({
    mutationKey: queryKeys.region.select().queryKey,
    mutationFn: (id: number) => patchUserRegion(id),
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
}
