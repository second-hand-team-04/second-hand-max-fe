import { useMutation } from "@tanstack/react-query";
import { OAuthProvider, postOAuthSignIn } from "api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function useOAuthSignInMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      provider,
      authCode,
    }: {
      provider: OAuthProvider;
      authCode: string;
    }) => postOAuthSignIn(provider, authCode),
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
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
