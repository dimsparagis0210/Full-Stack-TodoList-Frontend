import { API_URL } from "@/lib/constants";
import { apiFetch } from "@/api/apiFetch";
import type { UserDTO } from "@/types/types";

export const fetchUserByEmail = async (email: string) => {
    const response = await fetch(`${API_URL}/user/email/${email}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.json();
}

export const fetchUserById = async (id: number) => {
    const response = await fetch(`${API_URL}/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.json();
}

export const fetchUsersByName = async (content: string) => {
    const response = await apiFetch(`${API_URL}/user/all/${content}`);
    return response;
}

export const updateUser = async (user: UserDTO, id: number) => {
    const response = await apiFetch(`${API_URL}/user/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
    });
    return response;
}