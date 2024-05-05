import { sequelize } from "../database/conexion.js";
import { Faculty } from "./Faculty.js";
import { DataTypes } from "sequelize";

export const FacultyAvailability = sequelize.define("facultyAvailabilities", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
    defaultValue: true
  }
});

FacultyAvailability.belongsTo(Faculty);
Faculty.hasMany(FacultyAvailability);
