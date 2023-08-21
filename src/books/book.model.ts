import {DataTypes } from 'sequelize';

import sequelize from "../config/mysql-db-config";

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Cấu hình id tự động tăng
    timestamps: false, // Không sử dụng timestamps (created_at và updated_at)
    underscored: true, // Sử dụng underscored cho tên các cột
    tableName: 'books' // Tên bảng
});

// Đồng bộ hóa mô hình với cơ sở dữ liệu
(async () => {
    await sequelize.sync();
    console.log('Model "Book" đã được đồng bộ hóa với cơ sở dữ liệu.');
})();

export default Book;
