import z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address").trim(),
    password: z.string().trim(),
});

export type LoginSchema = z.infer<typeof loginSchema>;