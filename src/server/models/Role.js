import { Sequelize, DataTypes } from 'sequelize';
import User from './User.js'
const Role = Sequelize.define({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },


},

  { timestamps: true })


Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'role_id' });

export default Role
