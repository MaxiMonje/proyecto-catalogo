import Form, { FormCreationAttributes } from "../models/Form";
import { CreateFormDto, UpdateFormDto } from "../dtos/form.dto";
import { ApiError } from "../utils/ApiError";

export const getAllForms = async () => {
  return await Form.findAll({ where: { active: true } });
};

export const getFormById = async (id: number) => {
  const form = await Form.findOne({ where: { id, active: true } });
  if (!form) throw new ApiError("Form not found", 404);
  return form;
};

export const createForm = async (data: CreateFormDto) => {
  const payload: FormCreationAttributes = {
    ...data,
    active: true,
  };
  return await Form.create(payload);
};

export const updateForm = async (id: number, data: UpdateFormDto) => {
  const form = await Form.findOne({ where: { id, active: true } });
  if (!form) throw new ApiError("Form not found", 404);
  await form.update(data);
  return form;
};

export const deleteForm = async (id: number) => {
  const form = await Form.findOne({ where: { id, active: true } });
  if (!form) throw new ApiError("Form not found", 404);
  await form.update({ active: false });
  return { message: "Form disabled successfully" };
};
