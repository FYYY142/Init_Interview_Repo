// config.js
const path = require('path');
module.exports = {
  database: {
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/database.sqlite'), // 数据库文件存储位置
  },
  jwtSecret: 'your-secret-key', // JWT密钥
};
