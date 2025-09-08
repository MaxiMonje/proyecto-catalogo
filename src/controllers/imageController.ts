// controllers/imageController.ts
import { Request, Response, NextFunction } from "express";
import * as imageService from "../services/imageService";
import { createImageSchema, updateImageSchema, listImagesQuerySchema } from "../dtos/image.dto";

export const getAllImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = listImagesQuerySchema.safeParse(req.query);
    if (parsed.success) {
      const data = await imageService.listImages(parsed.data);
      return res.json(data);
    }
    // sin query -> devuelve todo activo
    const items = await imageService.getAllImages();
    res.json({ items, pagination: null });
  } catch (err) {
    next(err);
  }
};

export const getImageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await imageService.getImageById(parseInt(req.params.id, 10));
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = createImageSchema.parse(req.body);
    const item = await imageService.createImage(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = updateImageSchema.parse(req.body);
    const item = await imageService.updateImage(parseInt(req.params.id, 10), dto);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await imageService.deleteImage(parseInt(req.params.id, 10));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getPrimaryByForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formId = parseInt(req.params.formId, 10);
    res.json(await imageService.getPrimaryByForm(formId));
  } catch (err) {
    next(err);
  }
};
