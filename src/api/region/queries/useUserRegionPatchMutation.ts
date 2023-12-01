import { useMutation } from "@tanstack/react-query";
import { patchUserRegion } from "api/region";
import toast from "react-hot-toast";
import { regionKeys } from "./queryKey";

export default function useUserRegionPatchMutation() {
  return useMutation({
    mutationKey: regionKeys.select().queryKey,
    mutationFn: (id: number) => patchUserRegion(id),
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
}
