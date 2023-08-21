import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test_db', 'root', 'admin1234', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
