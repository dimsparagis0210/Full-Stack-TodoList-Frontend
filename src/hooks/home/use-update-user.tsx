/**
 * Update user hook
 *
 * This hook is used to update a user.
 */
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/user";
import type { UserDTO } from "@/types/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { queryClient } from "@/lib/queryClient";

export const useUpdateUser = (id: number) => {
  // Get the user from the Redux store to invalidate the user query
  const user = useSelector((state: RootState) => state.user);

  // Mutation hook
  return useMutation({
    mutationKey: ["updateUser", id],
    mutationFn: (user: UserDTO) => updateUser(user, id),
    onSuccess: () => {
      console.log("Invalidating user query");
      queryClient.invalidateQueries({ queryKey: ["user", user.email] });
      queryClient.invalidateQueries({ queryKey: ["user", user.id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
