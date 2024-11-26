// back_end/models/userModel.js
// 数据结构，数据库交互逻辑
// 封装增删改查
import db from '../data/db.js';

// 使用 db.js 中的 User 模型
const User = db.User;
const createUser = async (username, passwordHash) => {
    return await db.createUser(username, passwordHash);
};
const findUserByUsername = async (username) => {
    return await db.findUserByUsername(username);
};
export { User, createUser, findUserByUsername };
