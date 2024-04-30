import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";
export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "registrar"),
      defaultValue: "registrar",
    },
  },
  { timestamps: true },
);
