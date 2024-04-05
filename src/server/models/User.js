import { Sequelize, DataTypes } from 'sequelize';
import Role from './Role';
const User = Sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
  }
}, { timestamps: true });
User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'user_id' });

export default User;
