import { z } from "zod";

export const createImageSchema = z.object({
  formId: z.number().int().positive(),
  url: z.string().url({ message: "url must be a valid URL" }),
  desciption: z.string().min(1, { message: "desciption is required" }),
  price: z.string().min(1, { message: "price is required" }),
  quantity: z.string().min(1, { message: "quantity is required" })
});

export const updateImageSchema = createImageSchema.partial();

export type CreateImageDto = z.infer<typeof createImageSchema>;
export type UpdateImageDto = z.infer<typeof updateImageSchema>;
