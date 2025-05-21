const cron = require("node-cron");
const crawlTuoitreNews = require("./crawler");
const logger = require("../utils/logger");

// Số lượng bài viết cần crawl mỗi lần
const ARTICLES_LIMIT = 10;

// Chạy mỗi 30 phút
cron.schedule("*/30 * * * *", async () => {
  logger.info(`Starting Tuoi Tre crawler job (limit: ${ARTICLES_LIMIT} articles)...`);
  try {
    const articles = await crawlTuoitreNews(ARTICLES_LIMIT);
    logger.info(`Tuoi Tre crawler job completed. Crawled ${articles.length} new articles.`);
  } catch (error) {
    logger.error(`Tuoi Tre crawler job failed: ${error.message}`);
  }
});

// Chạy ngay lần đầu khi khởi động
(async () => {
  logger.info(`Running initial crawl (limit: ${ARTICLES_LIMIT} articles)...`);
  try {
    const articles = await crawlTuoitreNews(ARTICLES_LIMIT);
    logger.info(`Initial crawl completed. Crawled ${articles.length} new articles.`);
  } catch (error) {
    logger.error(`Initial crawl failed: ${error.message}`);
  }
})();

logger.info("Cron jobs scheduled");
