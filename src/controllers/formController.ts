import { Request, Response, NextFunction } from "express";
import * as formService from "../services/formService";

export const getAllForms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await formService.getAllForms();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getFormById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await formService.getFormById(parseInt(req.params.id, 10));
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await formService.createForm(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await formService.updateForm(parseInt(req.params.id, 10), req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await formService.deleteForm(parseInt(req.params.id, 10));
    res.json(result);
  } catch (err) {
    next(err);
  }
};
