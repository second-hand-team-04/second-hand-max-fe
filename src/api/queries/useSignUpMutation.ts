import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "api/user";
import { userKeys } from "./queryKeys";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function useSignUpMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: userKeys.signUp(),
    mutationFn: postSignUp,
    onSuccess: () => {
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
