/**
 * Add task hook
 * 
 * This hook is used to add a task to the board.
 */
import { addTaskToBoard } from "@/api/board";
import { queryClient } from "@/lib/queryClient";
import type { TaskDTO } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useAddTask = () => {
    // Get the user from the Redux store to invalidate the user query
    const user = useSelector((state: RootState) => state.user);

    // Mutation hook
    return useMutation({
        mutationFn: ({ task, creatorId }: { task: TaskDTO, creatorId: number }) => addTaskToBoard(task, creatorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", user.email] });
        },
        onError: (error) => {
            console.error(error);
        },
    })
}