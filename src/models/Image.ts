// models/Image.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/databaseService";

export interface ImageAttributes {
  id: number;
  formId: number;
  url: string;
  desciption: string; // (sic)
  price: string;
  quantity: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ImageCreationAttributes = Optional<
  ImageAttributes,
  "id" | "active" | "createdAt" | "updatedAt"
>;

export class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public formId!: number;
  public url!: string;
  public desciption!: string;
  public price!: string;
  public quantity!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    formId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: false },
    desciption: { type: DataTypes.STRING(500), allowNull: false }, // (sic)
    price: { type: DataTypes.STRING(50), allowNull: false },
    quantity: { type: DataTypes.STRING(50), allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: true,
    defaultScope: { where: { active: true } },
    scopes: { withInactive: {} },
  }
);

export default Image;
