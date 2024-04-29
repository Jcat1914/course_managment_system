import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize'
import { Faculty } from './Faculty.js'

export const FacultyCredentials = sequelize.define(
  'facultyCredentials',
  {
    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    degree: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    major: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
  }

)

