import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useUserInfoQuery from "./useUserInfoQuery";

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
