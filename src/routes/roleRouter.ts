import { Router } from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validate } from "../middlewares/validate";
import {
  createRoleSchema,
  updateRoleSchema,
} from "../validations/role.validation";

const router = Router();

router.get("/",  getAllRoles);
router.get("/:id",  getRoleById);

router.post("/",  validate(createRoleSchema), createRole);
router.put("/:id", validate(updateRoleSchema), updateRole);
router.delete("/:id",  deleteRole);

export default router;