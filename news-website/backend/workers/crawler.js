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
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const articles = [];
    let count = 0;

    // Hàm thêm bài viết vào danh sách
    const addArticle = (element) => {
      if (count >= limit) return false;

      const title = $(element).find("h3 a, h2 a, .box-title-news a, .title-news a").first().text().trim();
      let link = $(element).find("h3 a, h2 a, .box-title-news a, .title-news a").first().attr("href");
      
      if (!title || !link) return;

      // Xử lý link
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `https://tuoitre.vn${link}` : `https://tuoitre.vn/${link}`;
      }


      const summary = $(element).find(".sapo, .box-desc-news, .box-content p, .box-description").first().text().trim();
      const image = $(element).find("img").first().attr("data-src") || 
                  $(element).find("img").first().attr("src") ||
                  $(element).find("[data-src]").first().attr("data-src") ||
                  $(element).find("img[src*='.jpg'], img[src*='.png']").first().attr("src");
      
      // Xử lý ảnh nếu là đường dẫn tương đối
      let imageUrl = image;
      if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
        imageUrl = imageUrl.startsWith('/') ? `https://tuoitre.vn${imageUrl}` : `https://tuoitre.vn/${imageUrl}`;
      } else if (imageUrl && imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      }
      
      const category = link ? new URL(link).pathname.split('/')[1] : "unknown";
      
      // Lấy thời gian đăng bài
      const timeElement = $(element).find("time").first();
      let publishedAt = new Date();
      
      if (timeElement.length) {
        const datetime = timeElement.attr('datetime') || timeElement.text().trim();
        const parsedDate = new Date(datetime);
        if (!isNaN(parsedDate.getTime())) {
          publishedAt = parsedDate;
        }
      }

      articles.push({
        title,
        summary,
        imageUrl: imageUrl,
        sourceUrl: link,
        content: "", // Sẽ được cập nhật khi crawl chi tiết
        publishedAt,
        category,
      });
      count++;
    };

    // Lấy danh sách bài viết từ các vị trí khác nhau trên trang
    $("article.news-item, .box-category-item, .box-cate-news, .item-news, .box-category, .box-category li").each((index, element) => {
      if (count >= limit) return false;
      addArticle(element);
    });

    // Lấy thêm từ các box tin nổi bật
    if (count < limit) {
      $(".box-category-featured .box-category-item, .box-category-hot .box-category-item").each((index, element) => {
        if (count >= limit) return false;
        addArticle(element);
      });
    }

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
          
          // Thêm thông tin tác giả
          if (detailedArticle.author) {
            article.author = detailedArticle.author;
          }
          
          // Thêm danh sách hình ảnh
          if (detailedArticle.images && detailedArticle.images.length > 0) {
            article.images = detailedArticle.images;
            
            // Nếu chưa có ảnh đại diện, lấy ảnh đầu tiên từ bài viết
            if (!article.imageUrl && detailedArticle.images.length > 0) {
              article.imageUrl = detailedArticle.images[0];
            }
          }
          
          // Lưu vào database
          const savedArticle = await Article.create(article);
          savedArticles.push(savedArticle);
          logger.info(`Added new article: ${article.title} with ${article.images ? article.images.length : 0} images`);
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
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    // Lấy nội dung bài viết
    let content = "";
    $("article.content.fck, .detail-content, .detail-cate-main").find('p, h2, h3').each((index, element) => {
      const text = $(element).text().trim();
      if (text) {
        // Loại bỏ các đoạn quảng cáo hoặc không cần thiết
        if (!text.match(/đọc thêm|xem thêm|video|quảng cáo/i)) {
          content += text + "\n\n";
        }
      }
    });
    
    // Nếu không lấy được nội dung, thử cách khác
    if (!content) {
      $("#main-detail, .detail-content").find('p').each((index, element) => {
        const text = $(element).text().trim();
        if (text) {
          content += text + "\n\n";
        }
      });
    }
    
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
    
    // Lấy tác giả bài viết
    let author = "Tuổi Trẻ Online";
    const authorElement = $(".author-info, .author, .detail-author, [data-role='author']").first();
    if (authorElement.length) {
      const authorText = authorElement.text().trim();
      if (authorText) {
        // Xử lý chuỗi tác giả, loại bỏ các tiền tố không cần thiết
        author = authorText.replace(/^(tác giả|author|by):\s*/i, '').trim();
      }
    }
    
    // Lấy tất cả hình ảnh trong bài viết
    const images = [];
    $("article.content.fck img, .detail-content img, .detail-cate-main img").each((index, element) => {
      const imgSrc = $(element).attr("data-src") || $(element).attr("src");
      if (imgSrc) {
        let imageUrl = imgSrc;
        // Xử lý URL hình ảnh
        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
          imageUrl = imageUrl.startsWith('/') ? `https://tuoitre.vn${imageUrl}` : `https://tuoitre.vn/${imageUrl}`;
        } else if (imageUrl && imageUrl.startsWith('//')) {
          imageUrl = `https:${imageUrl}`;
        }
        
        // Chỉ thêm hình ảnh có đuôi hợp lệ
        if (imageUrl.match(/\.(jpg|jpeg|png|gif)($|\?)/i)) {
          images.push(imageUrl);
        }
      }
    });
    
    return {
      content: content.trim(),
      publishedAt,
      author,
      images: images.filter((url, index, self) => self.indexOf(url) === index) // Loại bỏ URL trùng lặp
    };
  } catch (error) {
    logger.error(`Error crawling article detail from ${url}: ${error.message}`);
    return null;
  }
}

module.exports = crawlTuoitreNews;
