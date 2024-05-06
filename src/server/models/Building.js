import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";
export const Building = sequelize.define(
  "buildings",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

