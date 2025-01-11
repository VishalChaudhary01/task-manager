import { z } from 'zod';

export const signupSchema = z.object({
     name: z.string().min(1, "Name is required").max(50, "Name is too larg").trim(),
     email: z.string().email("Email is not valid").trim(),
     password: z.string().min(4, "Password must be at least 4 characher logn.").max(50, "Password is too larg"),
});

export const signinSchema = z.object({
     email: z.string().email().trim(),
     password: z.string().min(1, "Password is required"),
})

export type SignupType = z.infer<typeof signupSchema>;
export type SigninType = z.infer<typeof signinSchema>;