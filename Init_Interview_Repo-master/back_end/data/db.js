//数据库操作封装

import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

// 创建 Sequelize 实例，连接到 SQLite 数据库
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'src/data/database.sqlite')
});

// 定义 User 模型
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// 封装数据库操作
const db = {
    sequelize,
    User,
    createUser: async (username, passwordHash) => {
        try {
            const newUser = await User.create({ username, passwordHash });
            return newUser;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },
    findUserByUsername: async (username) => {
        try {
            const user = await User.findOne({ where: { username } });
            return user;
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    },
    syncDatabase: async () => {
        try {
            await sequelize.sync();
            console.log('Database synchronized');
        } catch (error) {
            throw new Error('Error syncing database: ' + error.message);
        }
    }
};

// 导出 db 对象
export default db;