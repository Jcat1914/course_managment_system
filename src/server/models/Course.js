import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize'
import { Program } from './Program.js'

export const Course = sequelize.define(
  'courses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    courseLevel: {
      type: DataTypes.ENUM('1', '2', '3', '4'),
      allowNull: false
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
)
Program.belongsToMany(Course, { through: 'programCourses' })
Course.belongsToMany(Program, { through: 'programCourses' })
