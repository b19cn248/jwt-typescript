import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'hieu', '1234', {
    host: 'localhost',
    port: 33061,
    dialect: 'mysql'
});

export default sequelize;
