//数据结构，数据库交互逻辑
//封装增删改查
// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('../data/database.sqlite');

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

// 同步模型
sequelize.sync();
module.exports = User;
