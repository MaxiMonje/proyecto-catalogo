// services/imageService.ts
import Image, { ImageCreationAttributes } from "../models/Image";
import { CreateImageDto, UpdateImageDto, ListImagesQueryDto } from "../dtos/image.dto";
import { ApiError } from "../utils/ApiError";
import { normalizePrice, normalizeQuantity } from "../utils/imageFormat";
import { Op } from "sequelize";

export const listImages = async (q: ListImagesQueryDto) => {
  const where: any = {};
  if (q.formId) where.formId = q.formId;

  const offset = (q.page - 1) * q.pageSize;
  const order = [[q.orderBy, q.orderDir]] as any;

  const { rows, count } = await Image.findAndCountAll({
    where,
    offset,
    limit: q.pageSize,
    order,
  });

  return { items: rows, pagination: { page: q.page, pageSize: q.pageSize, total: count } };
};

export const getAllImages = async () => {
  return await Image.findAll(); // activo por defaultScope
};

export const getImageById = async (id: number) => {
  const item = await Image.findByPk(id);
  if (!item) throw new ApiError("Image not found", 404);
  return item;
};

export const createImage = async (data: CreateImageDto) => {
  // Evita duplicados (mismo formId + url activos)
  const dup = await Image.findOne({ where: { formId: data.formId, url: data.url } });
  if (dup) throw new ApiError("Image already exists for this formId and url", 409);

  const payload: ImageCreationAttributes = {
    ...data,
    price: normalizePrice(data.price),
    quantity: normalizeQuantity(data.quantity),
    active: true,
  };
  return await Image.create(payload);
};

export const updateImage = async (id: number, data: UpdateImageDto) => {
  const item = await Image.findByPk(id);
  if (!item || !item.active) throw new ApiError("Image not found", 404);

  // Si cambia url o formId, revalida duplicados
  const nextUrl = data.url ?? item.url;
  const nextFormId = data.formId ?? item.formId;
  if (nextUrl !== item.url || nextFormId !== item.formId) {
    const exists = await Image.findOne({
      where: {
        id: { [Op.ne]: id },
        formId: nextFormId,
        url: nextUrl,
        active: true,
      },
    });
    if (exists) throw new ApiError("Image already exists for this formId and url", 409);
  }

  const patch: Partial<ImageCreationAttributes> = { ...data };
  if (data.price !== undefined) patch.price = normalizePrice(String(data.price));
  if (data.quantity !== undefined) patch.quantity = normalizeQuantity(String(data.quantity));

  await item.update(patch);
  return item;
};

export const deleteImage = async (id: number) => {
  const item = await Image.scope("withInactive").findByPk(id);
  if (!item || !item.active) throw new ApiError("Image not found", 404);
  await item.update({ active: false }); // soft delete
  return { message: "Image disabled successfully" };
};

// "Principal" sin tocar la DB: la primera por fecha de creación (o id)
export const getPrimaryByForm = async (formId: number) => {
  const item = await Image.findOne({
    where: { formId, active: true },
    order: [["createdAt", "ASC"], ["id", "ASC"]],
  });
  if (!item) throw new ApiError("No images for this form", 404);
  return item;
};
