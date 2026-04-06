import z from "zod";
import { ROLES } from "@/utils/constants.util.js";

export const userIdSchema = z.object({
    id: z.coerce.number().min(1, "User ID should be a positive integer"),
});

export const createUserSchema = z.object({
    username: z.string().trim().max(255, 'username should be less than 255 characters'),
    email: z.email("Invalid email address").trim(),
    password: z.string().trim().min(8, 'password should be at least 8 characters long').max(15, 'password should be less than 15 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character'),
    role: z.enum(Object.values(ROLES)),
    is_active: z.boolean().default(true),
});

export const updateUserSchema = z.object({
    username: z.string().trim().max(255, 'username should be less than 255 characters'),
    password: z.string().trim().min(8, 'password should be at least 8 characters long').max(15, 'password should be less than 15 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character').optional(),
    role: z.enum(Object.values(ROLES)),
    is_active: z.boolean().default(true),
});

// types
export type UserIdSchema = z.infer<typeof userIdSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;