import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/databaseService";
import argon2 from "argon2";

interface UserAttributes {
  id: number;              // <- INT ahora
  name: string;
  lastName: string;
  email: string;
  cel: string;
  roleId: number;
  active: boolean;
  passwordHash: string;
  password?: string;       // virtual
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "active" | "createdAt" | "updatedAt" | "passwordHash"> {
  password: string; // requerido al crear
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;      // <- INT
  public name!: string;
  public lastName!: string;
  public email!: string;
  public cel!: string;
  public roleId!: number;
  public active!: boolean;
  public passwordHash!: string;
  public password?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async validatePassword(plain: string) {
    return argon2.verify(this.passwordHash, plain);
  }

  toJSON() {
    const v = { ...this.get() } as any;
    delete v.passwordHash;
    delete v.password;
    return v;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,   // <- INT
      autoIncrement: true,                // <- AUTOINCREMENT
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    cel: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

    password: { type: DataTypes.VIRTUAL, validate: { len: [8, 16] } },

    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    defaultScope: { attributes: { exclude: ["passwordHash"] } },
    hooks: {
      beforeCreate: async (user: User) => {
        if (!user.password || user.password.length < 8 || user.password.length > 16) {
          throw new Error("Password must be between 8 and 16 characters.");
        }
        user.passwordHash = await argon2.hash(user.password);
      },
      beforeUpdate: async (user: User) => {
        if (user.password) {
          if (user.password.length < 8 || user.password.length > 16) {
            throw new Error("Password must be between 8 and 16 characters.");
          }
          user.passwordHash = await argon2.hash(user.password);
        }
      },
    },
  }
);