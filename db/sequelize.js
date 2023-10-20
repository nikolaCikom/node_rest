import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('testDb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
