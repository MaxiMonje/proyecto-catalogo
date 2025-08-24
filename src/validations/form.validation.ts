import { z } from "zod";

export const createFormSchema = z.object({
  userId: z.number().int().positive(),
  title: z.string().min(1, { message: "title is required" })
});

export const updateFormSchema = createFormSchema.partial();

export type CreateFormDto = z.infer<typeof createFormSchema>;
export type UpdateFormDto = z.infer<typeof updateFormSchema>;
