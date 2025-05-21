const Article = require('./models/Article');
const sequelize = require('./config/database');

async function updateArticleImages() {
  try {
    // Lấy tất cả bài viết
    const articles = await Article.findAll();
    console.log(`Tìm thấy ${articles.length} bài viết để cập nhật.`);

    // Ánh xạ danh mục đến URL hình ảnh mới với URL tuyệt đối
    const categoryImageMap = {
      'giao-duc': 'https://placehold.co/800x450/3498db/ffffff?text=Giao+Duc',
      'kinh-doanh': 'https://placehold.co/800x450/2ecc71/ffffff?text=Kinh+Doanh',
      'the-thao': 'https://placehold.co/800x450/e74c3c/ffffff?text=The+Thao',
      'thoi-su': 'https://placehold.co/800x450/3498db/ffffff?text=Thoi+Su',
      'giai-tri': 'https://placehold.co/800x450/f39c12/ffffff?text=Giai+Tri',
      'cong-nghe': 'https://placehold.co/800x450/34495e/ffffff?text=Cong+Nghe',
      'suc-khoe': 'https://placehold.co/800x450/95a5a6/ffffff?text=Suc+Khoe',
      'du-lich': 'https://placehold.co/800x450/1abc9c/ffffff?text=Du+Lich',
      'khoa-hoc': 'https://placehold.co/800x450/9b59b6/ffffff?text=Khoa+Hoc',
      'am-thuc': 'https://placehold.co/800x450/e67e22/ffffff?text=Am+Thuc',
      'thoi-trang': 'https://placehold.co/800x450/f1c40f/ffffff?text=Thoi+Trang'
    };

    // Cập nhật URL hình ảnh cho mỗi bài viết
    for (const article of articles) {
      const newImageUrl = categoryImageMap[article.category] || 'https://placehold.co/800x450/cccccc/333333?text=No+Image';
      
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