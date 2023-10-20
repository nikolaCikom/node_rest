import { DataTypes } from "sequelize";
import sequelize from '../db/sequelize.js';
import Company from "./company.model.js";


const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    message: {
      type: DataTypes.STRING(500)
    },
    created_at: {
      type: DataTypes.DATE,
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER 
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

export default User;