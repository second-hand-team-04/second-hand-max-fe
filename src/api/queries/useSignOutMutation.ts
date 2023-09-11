import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSignOut } from "api/user";
import { useNavigate } from "react-router-dom";
import queryKeys from "./queryKeys";
import Routes from "router/Routes";

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

      navigate(Routes.SIGNIN);
    },
  });
}
