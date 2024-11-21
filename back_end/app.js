import express from 'express';
import authRoutes from './routes/authRoutes.js'; // 确保路径正确
import db from './data/db.js'; // 导入数据库实例

const app = express();

// 测试数据库连接
db.syncDatabase()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// 中间件
app.use(express.json()); // 用于解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 用于解析URL编码数据
app.use('/auth', authRoutes); // 使用 /auth 路径挂载认证路由

// 404错误处理
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 导出 app
export default app;