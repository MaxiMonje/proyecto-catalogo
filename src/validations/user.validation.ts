import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "name is required"),
  lastName: z.string().min(1, "lastName is required"),
  email: z.string().email("invalid email"),
  cel: z.string().min(1, "cel is required"),
  roleId: z.number({ required_error: "roleId is required" }),
  password: z.string().min(8, "password must be at least 8 chars").max(16, "password must be at most 16 chars"),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  cel: z.string().optional(),
  roleId: z.number().optional(),
  password: z.string().min(8).max(16).optional(),
});