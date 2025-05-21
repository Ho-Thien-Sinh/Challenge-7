const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");
const logger = require("../utils/logger");

/**
 * Crawl bài viết mới từ báo Tuổi Trẻ
 * @param {number} limit - Số lượng bài viết cần crawl
 * @returns {Promise<Array>} - Danh sách bài viết đã crawl
 */
async function crawlTuoitreNews(limit = 10) {
  try {
    const url = "https://tuoitre.vn/tin-moi-nhat.htm";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const articles = [];
    let count = 0;

    // Lấy danh sách bài viết từ trang tin mới nhất
    $(".news-item").each((index, element) => {
      // Chỉ lấy số lượng bài viết theo limit
      if (count >= limit) return false;

      const title = $(element).find("h3 a").text().trim();
      const link = $(element).find("h3 a").attr("href");
      const summary = $(element).find(".news-content p, .summary").text().trim();
      const image = $(element).find("img").attr("data-src") || $(element).find("img").attr("src");
      const category = link ? link.split("/")[1] : "unknown";
      
      // Lấy thời gian đăng bài (nếu có)
      const publishedTimeText = $(element).find(".time-ago, .date-time").text().trim();
      let publishedAt = new Date();
      
      if (title && link) {
        articles.push({
          title,
          summary,
          imageUrl: image,
          sourceUrl: `https://tuoitre.vn${link}`,
          content: "", // Sẽ được cập nhật khi crawl chi tiết
          publishedAt,
          category,
        });
        count++;
      }
    });

    logger.info(`Found ${articles.length} new articles from Tuoi Tre`);

    // Crawl nội dung chi tiết và lưu vào database
    const savedArticles = [];
    for (const article of articles) {
      try {
        // Kiểm tra xem bài viết đã tồn tại chưa
        const exists = await Article.findOne({ where: { sourceUrl: article.sourceUrl } });
        if (exists) {
          logger.info(`Article already exists: ${article.title}`);
          continue; // Bỏ qua bài viết đã tồn tại
        }

        // Crawl nội dung chi tiết
        const detailedArticle = await crawlArticleDetail(article.sourceUrl);
        if (detailedArticle) {
          // Cập nhật thông tin chi tiết
          article.content = detailedArticle.content || article.summary;
          article.publishedAt = detailedArticle.publishedAt || article.publishedAt;
          
          // Lưu vào database
          const savedArticle = await Article.create(article);
          savedArticles.push(savedArticle);
          logger.info(`Added new article: ${article.title}`);
        }
      } catch (error) {
        logger.error(`Error processing article ${article.title}: ${error.message}`);
      }
    }

    logger.info(`Successfully saved ${savedArticles.length} new articles from Tuoi Tre`);
    return savedArticles;
  } catch (error) {
    logger.error(`Error crawling Tuoi Tre: ${error.message}`);
    throw error;
  }
}

/**
 * Crawl chi tiết bài viết từ URL
 * @param {string} url - URL bài viết
 * @returns {Promise<Object>} - Thông tin chi tiết bài viết
 */
async function crawlArticleDetail(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Lấy nội dung bài viết
    let content = "";
    $(".detail-content p").each((index, element) => {
      content += $(element).text().trim() + "\n\n";
    });
    
    // Lấy thời gian đăng bài
    const dateTimeStr = $(".detail-time, .date-time").first().text().trim();
    let publishedAt = new Date();
    
    // Cố gắng parse thời gian từ chuỗi (VD: "Thứ Bảy, 12/10/2024 - 08:30")
    if (dateTimeStr) {
      const dateMatch = dateTimeStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      const timeMatch = dateTimeStr.match(/(\d{1,2}):(\d{1,2})/);
      
      if (dateMatch && timeMatch) {
        const day = parseInt(dateMatch[1]);
        const month = parseInt(dateMatch[2]) - 1; // Tháng trong JS bắt đầu từ 0
        const year = parseInt(dateMatch[3]);
        const hour = parseInt(timeMatch[1]);
        const minute = parseInt(timeMatch[2]);
        
        publishedAt = new Date(year, month, day, hour, minute);
      }
    }
    
    return {
      content: content.trim(),
      publishedAt
    };
  } catch (error) {
    logger.error(`Error crawling article detail from ${url}: ${error.message}`);
    return null;
  }
}

module.exports = crawlTuoitreNews;
