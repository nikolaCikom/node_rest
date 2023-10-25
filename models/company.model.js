import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Company = sequelize.define(
  'Company',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
    },
    image: {
      type: DataTypes.STRING(200),
    },
  },
  {
    tableName: 'company',
    timestamps: false,
  }
);

export default Company;
