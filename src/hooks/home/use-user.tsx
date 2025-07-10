/**
 * User hook
 * 
 * This hook is used to fetch a user by their email.
 */
import { useQuery } from "@tanstack/react-query";
import { fetchUserByEmail } from "@/api/user";

export const useUser = (email: string, options: any = {}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetchUserByEmail(email), 
        retry: false,
        enabled: !!email && options.enabled !== false, 
        ...options,
    });

    return { data, isLoading, error };
}

