import { sequelize } from '../database/conexion.js';
import { DataTypes } from 'sequelize';
import { Country } from './Country.js';
export const City = sequelize.define(
  'city',
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
  },
);

City.belongsTo(Country);
Country.hasMany(City);
