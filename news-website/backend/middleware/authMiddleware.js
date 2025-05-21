const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Middleware xác thực người dùng đã đăng nhập
exports.authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tìm người dùng từ ID trong token
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Người dùng không tồn tại'
      });
    }
    
    // Lưu thông tin người dùng vào request
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Lỗi xác thực: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập'
    });
  }
};

// Middleware kiểm tra quyền admin
exports.isAdmin = async (req, res, next) => {
  try {
    // Đảm bảo middleware authenticate đã chạy trước
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Vui lòng đăng nhập'
      });
    }
    
    // Kiểm tra quyền admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thực hiện hành động này'
      });
    }
    
    next();
  } catch (error) {
    logger.error(`Lỗi kiểm tra quyền admin: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};