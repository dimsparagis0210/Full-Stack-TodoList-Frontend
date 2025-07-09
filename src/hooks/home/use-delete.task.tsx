import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/api/board";
import { queryClient } from "@/lib/queryClient";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useDeleteTask = (taskId: number) => {
    const user = useSelector((state: RootState) => state.user);
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
    })
}