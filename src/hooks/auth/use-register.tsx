import { signUp } from "@/api/sign-up";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            console.log('success');
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/');
        },
        onError: () => {
            console.log('error');
        },
    });
}