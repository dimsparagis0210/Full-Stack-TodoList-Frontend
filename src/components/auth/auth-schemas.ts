import { z } from "zod";

/**
 * Sign in schema
 * @returns The sign in zod schema
 */
export const signInSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
  });
  
/**
 * Sign up schema
 * @returns The sign up zod schema
 */
export const signUpSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
      .min(3, 'Password must be at least 3 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });