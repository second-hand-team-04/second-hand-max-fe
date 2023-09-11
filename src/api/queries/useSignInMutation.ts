import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "api/user";
import { useNavigate } from "react-router-dom";
import useUserInfoQuery from "./useUserInfoQuery";
import Routes from "router/Routes";

export default function useSignInMutation() {
  const navigate = useNavigate();
  const { refetch: fetchUserInfo } = useUserInfoQuery();

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      fetchUserInfo();

      navigate(Routes.HOME);
    },
  });
}
