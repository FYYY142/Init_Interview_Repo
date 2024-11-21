// back_end/models/userModel.js
// 数据结构，数据库交互逻辑
// 封装增删改查
import db from '../data/db.js';

// 使用 db.js 中的 User 模型
const User = db.User;

// 你可以在这里添加一些额外的功能或方法，例如：
const createUser = async (username, passwordHash) => {
    return await db.createUser(username, passwordHash);
};

const findUserByUsername = async (username) => {
    return await db.findUserByUsername(username);
};

// 导出 User 模型和相关操作
export { User, createUser, findUserByUsername };
