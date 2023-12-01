import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserInfo } from "api/user";
import { toast } from "react-hot-toast";
import { userKeys } from "./queryKey";

export default function useUserInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userKeys.edit().queryKey,
    mutationFn: patchUserInfo,
    onSuccess: () => {
      toast.success("프로필이 수정되었습니다");
      queryClient.invalidateQueries({
        queryKey: userKeys.info().queryKey,
      });
    },
    meta: {
      errorMessage: "프로필 수정을 실패했습니다",
    },
    retry: false,
  });
}
