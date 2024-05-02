import { sequelize } from '../database//conexion.js';
import { Country } from './Country.js';
import { DataTypes } from 'sequelize';

export const Student = sequelize.define('students', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DOB: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  institutionalEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  personalEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  }
},
  { timestamps: true },
);

Student.belongsTo(Country)
Country.hasMany(Student)
