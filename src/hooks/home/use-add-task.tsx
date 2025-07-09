import { addTaskToBoard } from "@/api/board";
import { queryClient } from "@/lib/queryClient";
import type { TaskDTO } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useAddTask = () => {
    const user = useSelector((state: RootState) => state.user);
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