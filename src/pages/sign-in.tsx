/**
 * Sign in page
 * 
 * This page is the sign in page of the application.
 * It renders the sign in page and provides the auth form.
 */
import { AuthForm } from "@/components/auth/auth-form"
import { useEffect } from "react";

export const SignIn = () => {
    // Remove the tokens when the page is loaded
    useEffect(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }, []);
    return (
        <div className="flex justify-center items-center h-screen">
            <AuthForm isSignUp={false}/>
        </div>
    )
}