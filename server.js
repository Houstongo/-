const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // 导入 CORS 中间件

const app = express();

// 使用 CORS 中间件，允许所有来源的跨域请求
app.use(cors());
app.use(bodyParser.json());  // 解析 JSON 请求体

// MySQL 连接配置
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ly817718',
  database: 'nanodatabase'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// 插入实验数据（只处理 etch_depth, etch_time, etch_count）
app.post('/api/experiments', (req, res) => {
  const { etch_depth, etch_time, etch_count } = req.body;

  // 打印接收到的数据，方便调试
  console.log('Received data:', req.body);

  // 插入实验数据到数据库
  const sql = `INSERT INTO etching_experiments (etch_depth, etch_time, etch_count) VALUES (?, ?, ?)`;

  connection.query(sql, [etch_depth, etch_time, etch_count], (err, result) => {
    if (err) {
      console.error('Error saving data to database:', err);  // 打印错误日志
      res.status(500).send('Database error');
      return;
    }
    res.status(200).send('Data saved successfully');
  });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
