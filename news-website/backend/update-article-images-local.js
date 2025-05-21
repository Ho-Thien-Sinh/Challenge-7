const Article = require('./models/Article');
const sequelize = require('./config/database');

async function updateArticleImages() {
  try {
    // Lấy tất cả bài viết
    const articles = await Article.findAll();
    console.log(`Tìm thấy ${articles.length} bài viết để cập nhật.`);

    // Ánh xạ danh mục đến URL hình ảnh mới với URL tương đối
    const categoryImageMap = {
      'giao-duc': '/static/images/giao-duc.jpg',
      'kinh-doanh': '/static/images/kinh-doanh.jpg',
      'the-thao': '/static/images/the-thao.jpg',
      'thoi-su': '/static/images/thoi-su.jpg',
      'giai-tri': '/static/images/giai-tri.jpg',
      'cong-nghe': '/static/images/cong-nghe.jpg',
      'suc-khoe': '/static/images/suc-khoe.jpg',
      'du-lich': '/static/images/du-lich.jpg',
      'khoa-hoc': '/static/images/khoa-hoc.jpg',
      'am-thuc': '/static/images/am-thuc.jpg',
      'thoi-trang': '/static/images/thoi-trang.jpg'
    };

    // Cập nhật URL hình ảnh cho mỗi bài viết
    for (const article of articles) {
      const newImageUrl = categoryImageMap[article.category] || '/static/images/giao-duc.jpg';
      
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