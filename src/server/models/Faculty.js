import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize'
import { Course } from './Course.js'
import { FacultyCredentials } from './FacultyCredentials.js'

export const Faculty = sequelize.define(
  'faculty',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    institutionalEmail: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    personalEmail: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }
)
Faculty.belongsToMany(Course, { through: 'facultyCourses' })
Course.belongsToMany(Faculty, { through: 'facultyCourses' })
FacultyCredentials.belongsTo(Faculty)
Faculty.hasMany(FacultyCredentials)
