import { sequelize } from '../database/conexion.js'
import { DataTypes } from 'sequelize'
import { Buildings } from './Building.js'

export const Room = sequelize.define(
  "rooms",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    room_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    },
  }
)
Room.belongsTo(Buildings)
Buildings.hasMany(Room) 
