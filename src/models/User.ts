import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/databaseService";
import argon2 from "argon2";

export interface UserAttributes {
  id: number;
  name: string;
  lastName: string;
  email: string;
  cel: string;
  roleId: number;
  active: boolean;
  passwordHash: string;
  password?: string; // virtual
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "active" | "createdAt" | "updatedAt" | "passwordHash"> {
  password: string; // requerido al crear
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
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
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    cel: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

    // Campo virtual (no persiste), usado para recibir la contraseña en requests/seeders
    password: { type: DataTypes.VIRTUAL, validate: { len: [8, 16] } },

    // Hash persistido (NOT NULL)
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    defaultScope: { attributes: { exclude: ["passwordHash"] } },
    hooks: {
      // Hasheamos ANTES de validar para evitar "notNull Violation: passwordHash"
      beforeValidate: async (user: User) => {
        // CREATE: password obligatoria
        if (user.isNewRecord) {
          if (!user.password) {
            throw new Error("Password is required");
          }
          if (user.password.length < 8 || user.password.length > 16) {
            throw new Error("Password must be between 8 and 16 characters.");
          }
          user.passwordHash = await argon2.hash(user.password);
        } else {
          // UPDATE: solo si viene password; si no viene, dejamos el hash actual
          if (typeof user.password === "string" && user.password.length > 0) {
            if (user.password.length < 8 || user.password.length > 16) {
              throw new Error("Password must be between 8 and 16 characters.");
            }
            user.passwordHash = await argon2.hash(user.password);
          }
        }
      },
    },
  }
);
