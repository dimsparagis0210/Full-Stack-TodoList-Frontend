/**
 * Auth API
 * 
 * This module provides functions to interact with the auth API.
 * It includes functions to try to refresh the access token,
 * logout the user, sign in the user, and sign up the user.
 */
import { API_URL } from "@/lib/constants";
import type { SignInDTO, SignUpDTO } from "@/types/types";
import { apiFetch } from "./api-fetch";
/**
 * Try to refresh the access token
 * @returns The new access token or null if refresh fails
 */
export const tryRefreshToken = async (): Promise<string | null> => {
   const refreshToken = localStorage.getItem("refreshToken");
   if (!refreshToken) return null;

   try {
      const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return null;

      const data = await res.json(); // { accessToken: "..." }
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
   } catch (err) {
      console.error("Refresh failed:", err);
      return null;
   }
};

/**
 * Logout the user by removing the access and refresh tokens from local storage
 * and redirecting to the sign-in page
 */
export const logout = () => {
   localStorage.removeItem("accessToken");
   localStorage.removeItem("refreshToken");
   window.location.href = "/sign-in";
};

/**
 * Sign in the user
 * @param data - The data to sign in with
 * @returns The user
 */
export const signIn = async (data: SignInDTO) => {
  return await apiFetch(`${API_URL}/api/v1/auth/authenticate`, {
      method: 'POST',
      body: JSON.stringify(data),
  }); 
}

/**
 * Sign up the user
 * @param data - The data to sign up with
 * @returns The user
 */
export const signUp = async (data: SignUpDTO) => {
  return await apiFetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
  }); 
}