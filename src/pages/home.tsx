import { useAuth } from "@/hooks/auth/use-auth"
import { Navigate } from "react-router-dom";
import { logout, tryRefreshToken } from "@/api/auth";
import { decodeJwt } from "@/lib/jwt";
import { useUser } from "@/hooks/home/use-user";
import { useEffect, useState } from "react";
import type { User } from "@/types/types";
import { Header } from "@/components/home/header";
import { Main } from "@/components/home/main";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/user-slice";
import type { RootState } from "@/store/store";

export const Home = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const dispatch = useDispatch();
  const userContext = useSelector((state: RootState) => state.user);

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

  // Update userSlice when user data is fetched - this ensures proper Redux updates
  useEffect(() => {
    if (user && user.id) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen flex flex-col gap-y-10 px-5 pt-5 overflow-hidden z-10 relative">
      <Header />
      <Main />
    </div>
  );
};
