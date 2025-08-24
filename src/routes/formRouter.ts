import { Router } from "express";
import {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
} from "../controllers/formController";
import { validate } from "../middlewares/validate"; // usa el mismo middleware que en Payment
import { createFormSchema, updateFormSchema } from "../validations/form.validation";
// import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.get("/", /* isAuthenticated, */ getAllForms);
router.get("/:id", /* isAuthenticated, */ getFormById);
router.post("/", /* isAuthenticated, */ validate(createFormSchema), createForm);
router.put("/:id", /* isAuthenticated, */ validate(updateFormSchema), updateForm);
router.delete("/:id", /* isAuthenticated, */ deleteForm);

export default router;
