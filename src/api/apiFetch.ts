import { tryRefreshToken } from "./auth";

 
 export const apiFetch = async (url: string, options: RequestInit = {}, retry = false): Promise<any> => {
   const accessToken = localStorage.getItem("accessToken");
 
   const res = await fetch(url, {
     ...options,
     headers: {
       ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
       "Content-Type": "application/json",
       ...(options.headers || {}),
     },
   });
 
   if (res.status === 401 && retry) {
    console.log("Refreshing token");
     const newToken = await tryRefreshToken();
     if (newToken) {
       return apiFetch(url, options, false); // Retry once with new token
     } else {
       localStorage.removeItem("accessToken");
       localStorage.removeItem("refreshToken");
       window.location.href = "/sign-in";
       return;
     }
   }
 
   if (!res.ok) {
     const error = await res.text();
     throw new Error(error || "Request failed");
   }
   // If the response is a json, return the json
   if (res.headers.get("content-type")?.includes("application/json")) {
     const data = await res.json();
     return data;
   } else {
     return res.text();
   }
 };