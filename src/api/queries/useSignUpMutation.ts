import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "api/user";
import queryKeys from "./queryKeys";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";

export default function useSignUpMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: queryKeys.user.signUp().queryKey,
    mutationFn: postSignUp,
    onSuccess: () => {
      navigate(Routes.SIGNIN);
    },
  });
}
