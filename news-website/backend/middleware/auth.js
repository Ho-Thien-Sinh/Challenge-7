const { verifyToken } = require('../config/jwt');
const User = require('../models/User');
const logger = require('../utils/logger');

// Middleware xác thực người dùng
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không có token xác thực' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Xác thực token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token không hợp lệ hoặc đã hết hạn' 
      });
    }

    // Tìm người dùng
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Người dùng không tồn tại' 
      });
    }

    // Kiểm tra xác thực email
    if (!user.isVerified) {
      return res.status(401).json({ 
        success: false, 
        message: 'Tài khoản chưa được xác thực email' 
      });
    }

    // Lưu thông tin người dùng vào request
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi xác thực' 
    });
  }
};

module.exports = {
  authenticate
};