import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/user";
import type { UserDTO } from "@/types/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { queryClient } from "@/lib/queryClient";

export const useUpdateUser = (id: number) => {
    const user = useSelector((state: RootState) => state.user);
    return useMutation({
        mutationKey: ["updateUser", id],
        mutationFn: (user: UserDTO) => updateUser(user, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", user.email] });
        },
        onError: (error) => {
            console.error(error);
        },
    })
}