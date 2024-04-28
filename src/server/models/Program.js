// models/Program.js
import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";

export const Program = sequelize.define("Program", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  requiredCredits: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  degreeLevel: {
    type: DataTypes.ENUM('Associate', 'Bachelor', 'Master', 'Doctorate'),
    allowNull: false
  }
});


