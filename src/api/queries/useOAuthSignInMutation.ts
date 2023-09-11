import { useMutation } from "@tanstack/react-query";
import { OAuthProvider, getOAuthSignIn } from "api/user";
import { useNavigate } from "react-router-dom";
import useUserInfoQuery from "./useUserInfoQuery";
import Routes from "router/Routes";

export default function useOAuthSignInMutation() {
  const navigate = useNavigate();
  const { refetch: fetchUserInfo } = useUserInfoQuery();

  return useMutation({
    mutationFn: ({
      provider,
      authCode,
    }: {
      provider: OAuthProvider;
      authCode: string;
    }) => getOAuthSignIn(provider, authCode),
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      fetchUserInfo();

      navigate(Routes.HOME);
    },
  });
}
