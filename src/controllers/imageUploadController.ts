// controllers/imageUploadController.ts
import { Request, Response, NextFunction } from "express";
import { makeStorage } from "../storage";
import { createImageSchema } from "../dtos/image.dto";
import * as imageService from "../services/imageService";

export const uploadAndCreateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // multer ya corrió: req.file y req.body están listos
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) throw new Error("No image file provided (field: 'image')");

    // 1) subimos a storage
    const storage = makeStorage();
    const folder = `forms/${req.body.formId || "unknown"}`; // opcional para organizar
    const { url } = await storage.upload({
      buffer: file.buffer,
      mimetype: file.mimetype,
      originalname: file.originalname,
      folder,
    });

    // 2) validamos DTO (usa url que acabamos de generar)
    const dto = createImageSchema.parse({
      ...req.body,
      url, // sobreescribe cualquier url enviada por el cliente
    });

    // 3) creamos registro
    const created = await imageService.createImage(dto);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
