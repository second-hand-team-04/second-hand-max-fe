import { useMutation } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { patchUserInfo } from "api/user";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function useUserInfoMutation() {
  return useMutation({
    mutationKey: queryKeys.user.edit().queryKey,
    mutationFn: patchUserInfo,
    onSuccess: () => {
      toast.success("프로필이 수정되었습니다.");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    },
  });
}
