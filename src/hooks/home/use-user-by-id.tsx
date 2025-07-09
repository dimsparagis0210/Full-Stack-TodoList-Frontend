import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/api/user";

export const useUserById = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUserById(id),
    });
}   