import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/databaseService";

export interface FormAttributes {
  id: number;
  userId: number;
  title: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type FormCreationAttributes = Optional<FormAttributes, "id" | "active">;

export class Form
  extends Model<FormAttributes, FormCreationAttributes>
  implements FormAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Form.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    title: { type: DataTypes.STRING(150), allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  { sequelize, tableName: "forms", modelName: "Form" }
);

export default Form;
