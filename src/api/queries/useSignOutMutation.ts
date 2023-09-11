import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSignOut } from "api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import queryKeys from "./queryKeys";

export default function useSignOutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSignOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      queryClient.resetQueries({
        queryKey: queryKeys.user.info().queryKey,
        exact: true,
      });

      navigate("/signin");
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
