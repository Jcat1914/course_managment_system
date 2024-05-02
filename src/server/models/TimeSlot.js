import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";
import { TermSchedule } from "./TermSchedule.js";

export const TimeSlot = sequelize.define("timeSlot", {
  termScheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TermSchedules',
      key: 'id'
    }
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

TimeSlot.belongsTo(TermSchedule, { foreignKey: 'termScheduleId', as: 'termSchedule' });
