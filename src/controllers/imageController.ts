import { Request, Response, NextFunction } from "express";
import * as imageService from "../services/imageService";

export const getAllImages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await imageService.getAllImages();
    res.json(items);
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
    const item = await imageService.createImage(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await imageService.updateImage(parseInt(req.params.id, 10), req.body);
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
