const express = require('express');
const path = require('path');
const app = express();

// Phục vụ tệp tĩnh từ thư mục public
app.use('/static', express.static(path.join(__dirname, 'public')));

// Route đơn giản để kiểm tra
app.get('/', (req, res) => {
  res.send('Server is running. Try accessing <a href="/static/test.html">test.html</a> or <a href="/static/images/cong-nghe.jpg">an image</a>.');
});

// Khởi động server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});