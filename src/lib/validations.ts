import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  role: z.string().default("USER"),
  password: z.string().min(8).max(64),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});
