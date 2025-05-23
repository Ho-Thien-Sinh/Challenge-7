const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const logger = require("../utils/logger");

const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  // Thêm mảng các URL hình ảnh trong bài viết
  images: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    },
    defaultValue: '[]'
  },
  sourceUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  // Thêm trường tác giả
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Tuổi Trẻ Online'
  },
}, {
  timestamps: true,
  tableName: "articles",
});

// Đồng bộ model với database - chỉ tạo bảng nếu chưa tồn tại
(async () => {
  try {
    // alter: true sẽ cập nhật bảng nếu có thay đổi trong model
    // không xóa dữ liệu hiện có
    await Article.sync({ alter: true });
    logger.info("Article model synchronized successfully");
  } catch (error) {
    logger.error(`Error synchronizing Article model: ${error.message}`);
  }
})();

module.exports = Article;
