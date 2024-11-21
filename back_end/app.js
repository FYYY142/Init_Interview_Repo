const express = require('express');
const app = express();
const sequelize = require('./data/db'); 
const authRoutes = require('./routes/authRoutes'); // 认证相关的路由
const authMiddleware = require('./middleware/authMiddleware'); // JWT认证中间件


// 测试数据库连接
sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));
module.exports = sequelize;


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

// 同步数据库并启动服务器
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', ()=> {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });



module.exports = app;