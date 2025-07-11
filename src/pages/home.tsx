/**
 * Home page
 *
 * This page is the home page of the application.
 * It renders the home page and provides the header and the main content.
 */
import { useAuth } from "@/hooks/auth/use-auth";
import { Navigate } from "react-router-dom";
import { decodeJwt } from "@/lib/jwt";
import { useUser } from "@/hooks/home/use-user";
import { useEffect } from "react";
import type { User } from "@/types/types";
import { Header } from "@/components/home/header/header";
import { Main } from "@/components/home/main/main";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/user-slice";
import { useRefreshToken } from "@/hooks/home/use-refresh-token";
import { useCreateBoard } from "@/hooks/home/use-create-board";

export const Home = () => {
  // Hooks and states
  const { isAuthenticated, accessToken } = useAuth(); // Hook to check if the user is authenticated
  const isRefreshing = useRefreshToken(); // Hook to refresh the token
  const dispatch = useDispatch(); // Dispatch to update the user slice

  // Decode safely only when token exists
  const sub = accessToken ? decodeJwt(accessToken).sub : null;

  // Call the hook always, but control it using `enabled`
  const {
    data: user,
    isLoading,
    error,
  } = useUser(sub, {
    enabled: !isRefreshing && !!accessToken && !!sub,
  }) as { data: User | undefined; isLoading: boolean; error: any };

  const { mutate: createBoard } = useCreateBoard(user?.id || 0);
  useEffect(() => {
    if (user && user.id && !user.board) {
      createBoard();
    }
  }, [user, createBoard]);

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

  // While loading user
  if (isLoading) {
    return <div>Loading user...</div>;
  }

  // If there is an error or the user is not authenticated, redirect to the sign in page
  if (error || !user || !isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="h-screen flex flex-col gap-y-10 px-5 pt-5 overflow-hidden z-10 relative">
      <Header />
      <Main />
    </div>
  );
};
