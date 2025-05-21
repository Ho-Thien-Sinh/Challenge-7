const User = require('../models/User');
const sequelize = require('../config/database');
const logger = require('../utils/logger');

async function createAdminUser() {
  try {
    // Kiểm tra kết nối database
    await sequelize.authenticate();
    console.log('Kết nối database thành công.');

    // Kiểm tra xem đã có admin chưa
    const existingAdmin = await User.findOne({
      where: {
        email: 'admin@example.com',
        role: 'admin'
      }
    });

    if (existingAdmin) {
      console.log('Tài khoản admin đã tồn tại.');
      return;
    }

    // Tạo tài khoản admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      isVerified: true
    });

    console.log('Tạo tài khoản admin thành công:');
    console.log('- Email: admin@example.com');
    console.log('- Mật khẩu: Admin@123');
    console.log('Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.');
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản admin:', error);
  } finally {
    process.exit();
  }
}

createAdminUser();