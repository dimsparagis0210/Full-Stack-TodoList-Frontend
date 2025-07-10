/**
 * Search users hook
 * 
 * This hook is used to search for users by name.
 */
import { useQuery } from "@tanstack/react-query"
import { fetchUsersByName } from "@/api/user"

export const useSearchUsers = (content: string) => {
    return useQuery({
        queryKey: ["search-users", content],
        queryFn: () => fetchUsersByName(content),
        enabled: !!content,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
    })
}