import { User, UserCreationAttributes } from "../models/User";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { ApiError } from "../utils/ApiError";

export const getAllUsers = async () => {
  return await User.findAll({ where: { active: true } });
};

export const getUserById = async (id: number) => {        // <- number
  const user = await User.findOne({ where: { id, active: true } });
  if (!user) throw new ApiError("User not found", 404);
  return user;
};

export const createUser = async (data: CreateUserDto) => {
  const userData: UserCreationAttributes = { ...data, active: true } as UserCreationAttributes;
  const created = await User.create(userData);
  return created;
};

export const updateUser = async (id: number, data: UpdateUserDto) => {   // <- number
  const user = await User.unscoped().findOne({ where: { id, active: true } });
  if (!user) throw new ApiError("User not found", 404);

  if (typeof (data as any).password === "string") {
    user.set("password", (data as any).password);
  }

  user.set({
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    cel: data.cel,
    roleId: data.roleId,
  });

  await user.save();
  return await User.findByPk(id); // defaultScope => sin hash
};

export const deleteUser = async (id: number) => {          // <- number
  const user = await User.findOne({ where: { id, active: true } });
  if (!user) throw new ApiError("User not found", 404);
  await user.update({ active: false });
  return { message: "User disabled successfully" };
};

export const getUserByEmailForAuth = async (email: string) => {
  return await User.unscoped().findOne({ where: { email, active: true } });
};