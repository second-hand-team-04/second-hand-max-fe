import { useMutation } from "@tanstack/react-query";
import { patchUserRegion } from "api/region";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useUserRegionMutation() {
  return useMutation({
    mutationKey: queryKeys.region.select().queryKey,
    mutationFn: (id: number) => patchUserRegion(id),
    onSuccess: () => {
      toast.success("선택한 동네가 수정되었습니다.");
    },
  });
}
