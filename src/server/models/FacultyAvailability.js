import { sequelize } from "../database/conexion.js";
import { Faculty } from "./Faculty.js";
import { DataTypes } from "sequelize";

export const FacultyAvailability = sequelize.define("facultyAvailability", {
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
});

FacultyAvailability.belongsTo(Faculty);
Faculty.hasMany(FacultyAvailability);
