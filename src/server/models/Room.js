import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize'
import { Building } from './Building.js'

export const Room = sequelize.define(
  "rooms",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    roomCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  }
)
Room.belongsTo(Building)
Building.hasMany(Room) 
