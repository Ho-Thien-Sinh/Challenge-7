const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const logger = require("../utils/logger");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const crawlTuoitreNews = require("../workers/crawler");

// Lấy thông tin về lần crawl gần nhất
router.get("/status", async (req, res) => {
  try {
    // Lấy bài viết mới nhất
    const latestArticle = await Article.findOne({
      order: [["createdAt", "DESC"]],
    });

    // Lấy tổng số bài viết
    const totalArticles = await Article.count();

    // Lấy số bài viết trong 24h qua
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const articlesLast24h = await Article.count({
      where: {
        createdAt: {
          [require("sequelize").Op.gte]: oneDayAgo,
        },
      },
    });

    res.json({
      success: true,
      data: {
        totalArticles,
        articlesLast24h,
        latestCrawl: latestArticle ? {
          title: latestArticle.title,
          createdAt: latestArticle.createdAt,
          publishedAt: latestArticle.publishedAt,
        } : null,
        nextCrawl: getNextCrawlTime(),
      },
    });
  } catch (error) {
    logger.error(`Error getting crawler status: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin crawler",
    });
  }
});

// Kích hoạt crawl thủ công (chỉ admin)
router.post("/run", authenticate, isAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Giới hạn số lượng bài viết tối đa
    const actualLimit = Math.min(limit, 20);
    
    logger.info(`Manual crawl triggered by user ${req.user.id} (limit: ${actualLimit})`);
    
    // Chạy crawler bất đồng bộ
    res.json({
      success: true,
      message: `Đã kích hoạt crawl ${actualLimit} bài viết mới. Quá trình này sẽ diễn ra trong nền.`,
    });
    
    // Thực hiện crawl sau khi đã trả về response
    try {
      const articles = await crawlTuoitreNews(actualLimit);
      logger.info(`Manual crawl completed. Crawled ${articles.length} new articles.`);
    } catch (error) {
      logger.error(`Manual crawl failed: ${error.message}`);
    }
  } catch (error) {
    logger.error(`Error triggering manual crawl: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Lỗi khi kích hoạt crawl thủ công",
    });
  }
});

// Hàm tính thời gian crawl tiếp theo
function getNextCrawlTime() {
  const now = new Date();
  const minutes = now.getMinutes();
  const nextMinutes = minutes < 30 ? 30 : 60;
  const nextCrawl = new Date(now);
  nextCrawl.setMinutes(nextMinutes);
  nextCrawl.setSeconds(0);
  nextCrawl.setMilliseconds(0);
  
  return nextCrawl;
}

module.exports = router;