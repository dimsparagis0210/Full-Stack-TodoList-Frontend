/**
 * Authenticate hook
 * 
 * This hook is used to authenticate/sign in the user.
 */
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export const useAuthenticate = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/');
        },
        onError: () => {
            console.log('error');
        },
    });
}