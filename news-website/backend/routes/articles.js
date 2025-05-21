const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const logger = require("../utils/logger");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Lấy danh sách bài viết
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (category) {
      whereClause.category = category;
    }

    const { count, rows } = await Article.findAndCountAll({
      where: whereClause,
      order: [["publishedAt", "DESC"]],
      offset: parseInt(offset),
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    logger.error(`Error fetching articles: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Lấy chi tiết bài viết
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    logger.error(`Error fetching article ${req.params.id}: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Cập nhật bài viết (chỉ admin)
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    
    // Cập nhật các trường được gửi trong request
    await article.update(req.body);
    
    res.json({ success: true, data: article, message: "Article updated successfully" });
  } catch (error) {
    logger.error(`Error updating article ${req.params.id}: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Tạo bài viết mới (chỉ admin)
router.post("/", authenticate, isAdmin, async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: article, 
      message: "Bài viết đã được tạo thành công" 
    });
  } catch (error) {
    logger.error(`Error creating article: ${error.message}`);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// Xóa bài viết (chỉ admin)
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    }
    
    await article.destroy();
    res.json({ 
      success: true, 
      message: "Bài viết đã được xóa thành công" 
    });
  } catch (error) {
    logger.error(`Error deleting article ${req.params.id}: ${error.message}`);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

module.exports = router;
