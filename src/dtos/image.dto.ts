// dtos/image.dto.ts
import { z } from "zod";

// money 10 enteros + 2 decimales, punto o coma
const moneyRegex = /^\d{1,10}([.,]\d{1,2})?$/;
// entero como string
const intStringRegex = /^\d{1,9}$/;

export const createImageSchema = z.object({
  formId: z.coerce.number().int().positive(), // <- coerce
  url: z.string().url({ message: "url must be a valid URL" }).max(500),
  desciption: z.string().min(1, { message: "desciption is required" }).max(500), // (sic)
  price: z.string().trim().refine(v => moneyRegex.test(v), "price must be like 12345.67"),
  quantity: z.string().trim().refine(v => intStringRegex.test(v), "quantity must be an integer string"),
});

export const updateImageSchema = createImageSchema.partial();

export const listImagesQuerySchema = z.object({
  formId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
  orderBy: z.enum(["createdAt", "id"]).default("createdAt"),
  orderDir: z.enum(["ASC", "DESC"]).default("ASC"),
});

export type CreateImageDto = z.infer<typeof createImageSchema>;
export type UpdateImageDto = z.infer<typeof updateImageSchema>;
export type ListImagesQueryDto = z.infer<typeof listImagesQuerySchema>;
