//用户逻辑认证器
// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config');


// 注册
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 检查用户名和密码是否为空
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 创建用户
        const newUser = await User.create({ username, passwordHash: hashedPassword });
        
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error("Error registering user:", err);  // 记录详细的错误信息
        res.status(500).json({ message: "Error registering user", error: err });
    }
};
// 用户登录
exports.login = async (req, res) => {
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
};
