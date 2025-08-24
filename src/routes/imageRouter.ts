import { Router } from "express";
import {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage
} from "../controllers/imageController";
import { validate } from "../middlewares/validate";
import { createImageSchema, updateImageSchema } from "../validations/image.validation";
// import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.get("/", /* isAuthenticated, */ getAllImages);
router.get("/:id", /* isAuthenticated, */ getImageById);
router.post("/", /* isAuthenticated, */ validate(createImageSchema), createImage);
router.put("/:id", /* isAuthenticated, */ validate(updateImageSchema), updateImage);
router.delete("/:id", /* isAuthenticated, */ deleteImage);

export default router;
