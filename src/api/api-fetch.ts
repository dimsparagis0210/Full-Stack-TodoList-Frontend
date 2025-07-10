import { tryRefreshToken } from "./auth";

/**
 * Enhanced fetch utility with automatic token management and retry logic
 * 
 * This function wraps the native fetch API with additional features:
 * - Automatically includes JWT authorization headers
 * - Handles token expiration by refreshing and retrying requests
 * - Provides consistent error handling across the application
 * - Manages authentication state and redirects on auth failures
 * 
 * @param url - The URL to fetch from (absolute or relative)
 * @param options - Standard fetch RequestInit options (method, body, headers, etc.)
 * @param retry - Internal flag to prevent infinite retry loops (default: false)
 * @returns Promise that resolves to the parsed JSON response
 */
export const apiFetch = async (
   url: string,
   options: RequestInit = {},
   retry = false
): Promise<any> => {
   const accessToken = localStorage.getItem("accessToken");

   // Make the HTTP request with enhanced headers
   const res = await fetch(url, {
      ...options, 
      headers: {
         ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
         "Content-Type": "application/json",
         ...(options.headers || {}),
      },
   });

   // Handle authentication and authorization errors with token refresh
   if (
      (res.status === 401 || res.status === 403 || res.status === 404) &&
      retry
   ) {
      const newToken = await tryRefreshToken();
      
      if (newToken) {
         // Token refresh successful - retry the original request once
         return apiFetch(url, options, false); // Set retry=false to prevent infinite loops
      } else {
         // Token refresh failed - user needs to re-authenticate
         // Clear stored tokens to prevent further failed requests
         localStorage.removeItem("accessToken");
         localStorage.removeItem("refreshToken");
         
         // Redirect to sign-in page for re-authentication
         window.location.href = "/sign-in";
         return;
      }
   }

   // Handle non-authentication HTTP errors (400, 500, etc.)
   if (!res.ok) {
      // Extract error message from response body
      const error = await res.text();
      // Throw descriptive error with server message or generic fallback
      throw new Error(error || "Request failed");
   }

   // Parse and return successful JSON response
   if (res.headers.get("content-type")?.includes("application/json")) {
      const data = await res.json();
      return data;
   }
};
