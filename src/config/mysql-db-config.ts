import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test_db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
