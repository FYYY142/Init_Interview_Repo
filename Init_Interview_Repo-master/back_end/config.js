// back_end/config.js
import path from 'path';

const config = {
  database: {
    dialect: 'sqlite',
    storage: path.join(process.cwd(), './data/database.sqlite'), // 数据库文件存储位置
  },
  jwtSecret: 'your-secret-key', // JWT密钥
};

export default config; // 使用默认导出
