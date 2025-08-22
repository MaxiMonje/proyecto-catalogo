import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validate } from "../middlewares/validate";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/", validate(createUserSchema), createUser);
router.put("/:id",  validate(updateUserSchema), updateUser);
router.delete("/:id",  deleteUser);

export default router;