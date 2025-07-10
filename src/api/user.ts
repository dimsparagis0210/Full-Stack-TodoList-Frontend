/**
 * User API
 * 
 * This module provides functions to interact with the user API.
 * It includes functions to fetch users by email, id, and name,
 * as well as to update users.
 */
import { API_URL } from "@/lib/constants";
import { apiFetch } from "@/api/api-fetch";
import type { UserDTO } from "@/types/types";

/**
 * Fetch a user by email
 * @param email - The email of the user
 * @returns The user
 */
export const fetchUserByEmail = async (email: string) => {
    const response = await fetch(`${API_URL}/user/email/${email}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.json();
}

/**
 * Fetch a user by id
 * @param id - The id of the user
 * @returns The user
 */
export const fetchUserById = async (id: number) => {
    const response = await fetch(`${API_URL}/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.json();
}

/**
 * Fetch users by name
 * @param content - The content to search for
 * @returns The users
 */
export const fetchUsersByName = async (content: string) => {
    const response = await apiFetch(`${API_URL}/user/all/${content}`);
    return response;
}

/**
 * Update a user
 * @param user - The user to update
 * @param id - The id of the user to update
 * @returns The user
 */
export const updateUser = async (user: UserDTO, id: number) => {
    const response = await apiFetch(`${API_URL}/user/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
    });
    return response;
}