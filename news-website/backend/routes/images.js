const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Đường dẫn đến thư mục lưu trữ hình ảnh
const uploadDir = path.join(__dirname, '../public/images');

// Đảm bảo thư mục tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình lưu trữ cho multer (tương thích với multer v2)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Tạo tên file ngẫu nhiên để tránh trùng lặp
    const randomName = crypto.randomBytes(16).toString('hex');
    const fileExt = path.extname(file.originalname);
    cb(null, `${randomName}${fileExt}`);
  }
});

// Lọc file - chỉ chấp nhận hình ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file hình ảnh (jpeg, jpg, png, gif, webp)'), false);
  }
};

// Cấu hình multer với xử lý lỗi
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
  },
  fileFilter: fileFilter
}).single('image'); // Đã tích hợp middleware single vào biến upload

// API endpoint để lấy hình ảnh theo tên file
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  
  // Kiểm tra xem file có tồn tại không
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy hình ảnh'
    });
  }
});

// API endpoint để tải lên hình ảnh (chỉ admin)
router.post('/upload', authenticate, isAdmin, (req, res) => {
  // Sử dụng multer như một middleware với xử lý lỗi
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // Lỗi từ multer
      console.error('Lỗi Multer:', err);
      return res.status(400).json({
        success: false,
        message: `Lỗi khi tải lên: ${err.message}`
      });
    } else if (err) {
      // Lỗi không xác định
      console.error('Lỗi không xác định:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Lỗi khi tải lên hình ảnh'
      });
    }
    
    // Kiểm tra xem có file nào được tải lên không
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không có file nào được tải lên'
      });
    }

    // Trả về URL của hình ảnh đã tải lên
    const imageUrl = `/api/v1/images/${req.file.filename}`;
    
    return res.status(201).json({
      success: true,
      data: {
        imageUrl: imageUrl,
        filename: req.file.filename,
        size: req.file.size
      }
    });
  });
});

// API endpoint để lấy danh sách tất cả hình ảnh
router.get('/', (req, res) => {
  try {
    // Đọc thư mục hình ảnh
    const files = fs.readdirSync(uploadDir);
    
    // Lọc ra chỉ các file hình ảnh
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    // Tạo danh sách hình ảnh với URL
    const images = imageFiles.map(filename => ({
      filename,
      url: `/api/v1/images/${filename}`,
      path: path.join(uploadDir, filename)
    }));
    
    return res.status(200).json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hình ảnh:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách hình ảnh'
    });
  }
});

// API endpoint để lấy danh sách hình ảnh
router.get('/', (req, res) => {
  try {
    const imagesDir = path.join(__dirname, '../public/images');
    
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error('Lỗi khi đọc thư mục hình ảnh:', err);
        return res.status(500).json({
          success: false,
          message: 'Lỗi khi lấy danh sách hình ảnh'
        });
      }
      
      // Lọc ra chỉ các file hình ảnh
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });
      
      // Tạo URL cho mỗi hình ảnh
      const images = imageFiles.map(file => ({
        filename: file,
        url: `/static/images/${file}`
      }));
      
      return res.status(200).json({
        success: true,
        data: images
      });
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hình ảnh:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách hình ảnh'
    });
  }
});

// API endpoint để xóa hình ảnh
router.delete('/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../public/images', filename);
    
    // Kiểm tra xem file có tồn tại không
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Hình ảnh không tồn tại'
      });
    }
    
    // Xóa file
    fs.unlinkSync(filePath);
    
    return res.status(200).json({
      success: true,
      message: 'Đã xóa hình ảnh thành công'
    });
  } catch (error) {
    console.error('Lỗi khi xóa hình ảnh:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa hình ảnh'
    });
  }
});

module.exports = router;