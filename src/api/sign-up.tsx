import { API_URL } from "@/lib/constants";
import { apiFetch } from "./apiFetch";
import type { SignUpDTO } from "@/types/types";

export const signUp = async (data: SignUpDTO) => {
    return await apiFetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
    }); 
}