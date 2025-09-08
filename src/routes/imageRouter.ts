// routes/image.routes.ts
import { Router } from "express";
import {
  getAllImages, getImageById, createImage, updateImage, deleteImage, getPrimaryByForm
} from "../controllers/imageController";
import { uploadImageMw } from "../middlewares/upload";
import { uploadAndCreateImage } from "../controllers/imageUploadController";

const router = Router();

// Listado con filtros/paginación (opcional)
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.get("/form/:formId/primary", getPrimaryByForm);

// Crear con JSON tradicional (url ya existente)
router.post("/", createImage);

// Crear subiendo archivo (multipart/form-data)
router.post("/upload", uploadImageMw, uploadAndCreateImage);

router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;
