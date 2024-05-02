import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize';

export const Country = sequelize.define(
  'countries',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
  },
  { timestamps: false }
);

