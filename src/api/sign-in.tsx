import type { SignInDTO } from "@/types/types";
import { apiFetch } from "./apiFetch";
import { API_URL } from "@/lib/constants";

export const signIn = async (data: SignInDTO) => {
    console.log(data);
    return await apiFetch(`${API_URL}/api/v1/auth/authenticate`, {
        method: 'POST',
        body: JSON.stringify(data),
    }); 
}