import { useAuth } from "@/hooks/auth/use-auth"
import { Navigate } from "react-router-dom";
import { logout, tryRefreshToken } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { decodeJwt } from "@/lib/jwt";
import { useUser } from "@/hooks/home/use-user";
import { useEffect, useState } from "react";
import type { User } from "@/types/types";

export const Home = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(true);

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

  // Decode safely only when token exists
  const sub = accessToken ? decodeJwt(accessToken).sub : null;

     // Call the hook always, but control it using `enabled`
   const { data: user, isLoading, error } = useUser(sub, {
     enabled: !isRefreshing && !!accessToken && !!sub,
   }) as { data: User | undefined, isLoading: boolean, error: any };

  // While refreshing token
  if (isRefreshing) {
    return <div>Refreshing token...</div>;
  }

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (error || !user || !isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  console.log("User", user);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Home</h1>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
        >
          Logout
        </Button>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Authentication Status: ✅ Authenticated</p>
        <p>Access Token: ✅ Present</p>
        <p>User: {user.name}</p>
      </div>
    </div>
  );
};
