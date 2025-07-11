/**
 * Edit task hook
 *
 * This hook is used to edit a task on the board.
 */
import { queryClient } from "@/lib/queryClient";
import type { TaskDTO } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { editTask } from "@/api/board";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useEditTask = (taskId: number) => {
  // Get the user from the Redux store to invalidate the user query
  const user = useSelector((state: RootState) => state.user);

  // Mutation hook
  return useMutation({
    mutationKey: ["editTask", taskId],
    mutationFn: ({ task, taskId }: { task: TaskDTO; taskId: number }) =>
      editTask(task, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user.email] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
