import { useMutation } from "@tanstack/react-query";
import { deleteSignOut } from "api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function useSignOutMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteSignOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

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
