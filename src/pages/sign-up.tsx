/**
 * Sign up page
 *
 * This page is the sign up page of the application.
 * It renders the sign up page and provides the auth form.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { useEffect } from "react";

export const SignUp = () => {
  // Remove the tokens when the page is loaded
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Blurry gradient background */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full h-[50%] pointer-events-none z-0">
      <div className="w-full h-full bg-gradient-to-b from-[#16e7e7] via-[#cd1dcd] to-[#33eae7] rounded-full filter blur-[100px] opacity-30"></div>

      </div>

      {/* Auth form - positioned above the background */}
      <AuthForm isSignUp={true} />
    </div>
  );
};
