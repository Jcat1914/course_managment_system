import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize'

export const Faculty = sequelize.define(
  'faculty',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firtName: {
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
      type: DataTypes.STRING(24),
      allowNull: false
    },
    personalEmail: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }

)
