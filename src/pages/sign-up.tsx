import { AuthForm } from "@/components/auth/AuthForm"
import { useEffect } from "react";

export const SignUp = () => {
    useEffect(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }, []);
    return (
        <div className="flex justify-center items-center h-screen">
            <AuthForm isSignUp={true}/>
        </div>
    )
}
