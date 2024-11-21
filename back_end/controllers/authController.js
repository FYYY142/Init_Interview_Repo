// back_end/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js'; // 确保使用 ES 模块导入
import config from '../config.js'; // 确保使用 ES 模块导入
import { Console } from 'console';

const authController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, passwordHash: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user: newUser });
            
        } catch (err) {
            console.error("Error registering user:", err);
            res.status(500).json({ message: "Error registering user", error: err });
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
};

export default authController; // 使用默认导出
