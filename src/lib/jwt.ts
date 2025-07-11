/**
 * JWT
 *
 * This file contains the functions to decode a JWT.
 */
export const decodeJwt = (token: string): any | null => {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return null;
  }
};
