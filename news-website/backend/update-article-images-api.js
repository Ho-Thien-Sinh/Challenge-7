const Article = require('./models/Article');
const sequelize = require('./config/database');

async function updateArticleImages() {
  try {
    // Lấy tất cả bài viết
    const articles = await Article.findAll();
    console.log(`Tìm thấy ${articles.length} bài viết để cập nhật.`);

    // Ánh xạ danh mục đến URL hình ảnh mới với URL API
    const categoryImageMap = {
      'giao-duc': '/api/v1/images/giao-duc.jpg',
      'kinh-doanh': '/api/v1/images/kinh-doanh.jpg',
      'the-thao': '/api/v1/images/the-thao.jpg',
      'thoi-su': '/api/v1/images/thoi-su.jpg',
      'giai-tri': '/api/v1/images/giai-tri.jpg',
      'cong-nghe': '/api/v1/images/cong-nghe.jpg',
      'suc-khoe': '/api/v1/images/suc-khoe.jpg',
      'du-lich': '/api/v1/images/du-lich.jpg',
      'khoa-hoc': '/api/v1/images/khoa-hoc.jpg',
      'am-thuc': '/api/v1/images/am-thuc.jpg',
      'thoi-trang': '/api/v1/images/thoi-trang.jpg'
    };

    // Cập nhật URL hình ảnh cho mỗi bài viết
    for (const article of articles) {
      const newImageUrl = categoryImageMap[article.category] || '/api/v1/images/giao-duc.jpg';
      
      await article.update({
        imageUrl: newImageUrl
      });
      
      console.log(`Đã cập nhật bài viết ID ${article.id}: ${article.title} - Hình ảnh mới: ${newImageUrl}`);
    }

    console.log('Cập nhật hoàn tất!');
  } catch (error) {
    console.error('Lỗi khi cập nhật hình ảnh bài viết:', error);
  } finally {
    process.exit();
  }
}

updateArticleImages();