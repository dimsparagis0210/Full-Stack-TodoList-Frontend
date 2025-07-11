/**
 * Delete task hook
 *
 * This hook is used to delete a task from the board.
 */
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/api/board";
import { queryClient } from "@/lib/queryClient";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useDeleteTask = (taskId: number) => {
  // Get the user from the Redux store to invalidate the user query
  const user = useSelector((state: RootState) => state.user);

  // Mutation hook
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      console.log("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["user", user.email] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
