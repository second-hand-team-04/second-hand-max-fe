import { useMutation } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { patchUserInfo } from "api/user";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function useUserInfoMutation() {
  return useMutation({
    mutationKey: queryKeys.user.edit().queryKey,
    mutationFn: patchUserInfo,
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    },
  });
}
