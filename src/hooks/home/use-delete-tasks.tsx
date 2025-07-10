/**
 * Delete tasks hook
 * 
 * This hook is used to delete tasks from the board.
 */
import { deleteTasks } from "@/api/board"
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useDeleteTask = () => {
    const user = useSelector((state: RootState) => state.user);
    return useMutation({
        mutationKey: ["delete-tasks"],
        mutationFn: deleteTasks,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", user.email]});
        },
        onError: (error) => {
            console.log(error);
        }
    })
}