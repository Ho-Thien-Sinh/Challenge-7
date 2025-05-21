const express = require('express');
const app = express();
const path = require('path');

// Phục vụ tệp tĩnh
app.use('/static', express.static(path.join(__dirname, 'public')));

// Route đơn giản để kiểm tra
app.get('/api/images', (req, res) => {
  res.json({
    success: true,
    message: 'Images API is working',
    images: [
      { name: 'cong-nghe.jpg', url: '/static/images/cong-nghe.jpg' },
      { name: 'kinh-doanh.jpg', url: '/static/images/kinh-doanh.jpg' }
    ]
  });
});

// Khởi động server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});