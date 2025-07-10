/**
 * Hook to refresh the token on focus or visibility change
 * @returns The state of the refresh token
 */
import { useEffect, useState } from "react";
import { logout, tryRefreshToken } from "@/api/auth";

export const useRefreshToken = () => {
    // States
    const [isRefreshing, setIsRefreshing] = useState(true);

    // Effect to refresh the token on focus or visibility change
    useEffect(() => {
        const refreshToken = async () => {
          const newToken = await tryRefreshToken();
          if (!newToken) {
            logout();
          } else {
            localStorage.setItem("accessToken", newToken);
          }
          setIsRefreshing(false);
        };
    
        // Initial refresh
        refreshToken();
    
        // Refresh when window regains focus
        const handleFocus = () => {
          refreshToken();
        };
    
        const handleVisibilityChange = () => {
          if (!document.hidden) {
            refreshToken();
          }
        };
    
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          window.removeEventListener('focus', handleFocus);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      }, []);

      return isRefreshing;
}