import Image, { ImageCreationAttributes } from "../models/Image";
import { CreateImageDto, UpdateImageDto } from "../dtos/image.dto";
import { ApiError } from "../utils/ApiError";

export const getAllImages = async () => {
  return await Image.findAll({ where: { active: true } });
};

export const getImageById = async (id: number) => {
  const item = await Image.findOne({ where: { id, active: true } });
  if (!item) throw new ApiError("Image not found", 404);
  return item;
};

export const createImage = async (data: CreateImageDto) => {
  const payload: ImageCreationAttributes = { ...data, active: true };
  return await Image.create(payload);
};

export const updateImage = async (id: number, data: UpdateImageDto) => {
  const item = await Image.findOne({ where: { id, active: true } });
  if (!item) throw new ApiError("Image not found", 404);
  await item.update(data);
  return item;
};

export const deleteImage = async (id: number) => {
  const item = await Image.findOne({ where: { id, active: true } });
  if (!item) throw new ApiError("Image not found", 404);
  await item.update({ active: false }); // soft delete
  return { message: "Image disabled successfully" };
};
