import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, "Password must contain minimum 8 characters")
    .max(40, "Password can't be longer than 40 characters"),
});
