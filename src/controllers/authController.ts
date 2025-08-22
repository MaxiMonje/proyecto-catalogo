import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import * as jwt from "jsonwebtoken";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? "super_secret_key";
const EXPIRES_IN: jwt.SignOptions["expiresIn"] = "2h";

type AuthTokenPayload = {
  sub: string;        // JWT spec: string
  email: string;
  roleId: number;
  name: string;
  lastName: string;
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userService.getUserByEmailForAuth(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await user.validatePassword(password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const payload: AuthTokenPayload = {
      sub: String(user.id),  
      email: user.email,
      roleId: user.roleId,
      name: user.name,
      lastName: user.lastName,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        cel: user.cel,
        roleId: user.roleId,
        active: user.active,
      },
    });
  } catch (err) {
    next(err);
  }
};