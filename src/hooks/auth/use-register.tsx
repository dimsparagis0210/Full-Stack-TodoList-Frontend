/**
 * Register hook
 *
 * This hook is used to register/sign up a new user.
 */
import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = (onError: (error: any) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log("success");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    },
    onError: (error) => {
      onError(error);
    },
  });
};
