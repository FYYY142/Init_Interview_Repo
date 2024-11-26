//定义路由 
//API路径和请求方式

import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
export default router;
