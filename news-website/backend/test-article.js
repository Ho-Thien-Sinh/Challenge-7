const Article = require('./models/Article');
const sequelize = require('./config/database');

async function createTestArticle() {
  try {
    // Tạo một bài viết thử nghiệm
    const article = await Article.create({
      title: 'Bài viết thử nghiệm',
      summary: 'Đây là bài viết thử nghiệm',
      content: 'Nội dung bài viết thử nghiệm',
      imageUrl: 'https://example.com/image.jpg',
      sourceUrl: 'https://example.com/article-' + Date.now(),
      publishedAt: new Date(),
      category: 'Thử nghiệm'
    });

    console.log('Đã tạo bài viết thử nghiệm:', article.id);

    // Lấy tất cả bài viết
    const articles = await Article.findAll();
    console.log('Tổng số bài viết:', articles.length);
  } catch (error) {
    console.error('Lỗi:', error);
  } finally {
    process.exit();
  }
}

createTestArticle();