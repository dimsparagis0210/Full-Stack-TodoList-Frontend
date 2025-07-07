import { API_URL } from "@/lib/constants";

export const fetchUserByEmail = async (email: string) => {
    const response = await fetch(`${API_URL}/user/email/${email}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.json();
}