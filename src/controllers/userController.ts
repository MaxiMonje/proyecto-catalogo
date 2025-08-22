import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

const parseId = (req: Request) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) throw Object.assign(new Error("Invalid id"), { status: 400 });
  return id;
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseId(req);
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body); // password requerido en DTO
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseId(req);
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseId(req);
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};