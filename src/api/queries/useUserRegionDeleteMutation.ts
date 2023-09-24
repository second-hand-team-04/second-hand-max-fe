import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserRegion } from "api/region";
import toast from "react-hot-toast";
import queryKeys from "./queryKeys";

export default function useUserRegionDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.region.userRegions().queryKey,
    mutationFn: (id: number) => deleteUserRegion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.region.userRegions().queryKey,
      });
      toast.success("선택한 동네가 삭제되었어요");
    },
  });
}
