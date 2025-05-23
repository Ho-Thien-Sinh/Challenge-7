const axios = require('axios');
const cheerio = require('cheerio');

async function crawlTuoitreNewsDirect(limit = 5) {
  try {
    const url = "https://tuoitre.vn/tin-moi-nhat.htm";
    console.log(`Fetching articles from: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    // Find all potential article elements
    const articleElements = $('article.news-item, .box-category-item, .box-cate-news, .item-news, .box-category, .box-category li');
    console.log(`Found ${articleElements.length} potential articles on the page`);
    
    // Process each article
    for (let i = 0; i < Math.min(articleElements.length, limit); i++) {
      const element = articleElements[i];
      const $el = $(element);
      
      const title = $el.find("h3 a, h2 a, .box-title-news a, .title-news a").first().text().trim();
      let link = $el.find("h3 a, h2 a, .box-title-news a, .title-news a").first().attr("href");
      
      if (!title || !link) continue;
      
      // Process link
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `https://tuoitre.vn${link}` : `https://tuoitre.vn/${link}`;
      }
      
      const summary = $el.find(".sapo, .box-desc-news, .box-content p, .box-description").first().text().trim();
      const image = $el.find("img").first().attr("data-src") || 
                  $el.find("img").first().attr("src") ||
                  $el.find("[data-src]").first().attr("data-src") ||
                  $el.find("img[src*='.jpg'], img[src*='.png']").first().attr("src");
      
      // Process image URL
      let imageUrl = image;
      if (imageUrl) {
        if (!imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
          imageUrl = imageUrl.startsWith('/') ? `https://tuoitre.vn${imageUrl}` : `https://tuoitre.vn/${imageUrl}`;
        } else if (imageUrl.startsWith('//')) {
          imageUrl = `https:${imageUrl}`;
        }
      }
      
      const category = link ? new URL(link).pathname.split('/')[1] : "unknown";
      
      // Get publish time
      const timeElement = $el.find("time").first();
      let publishedAt = new Date();
      
      if (timeElement.length) {
        const datetime = timeElement.attr('datetime') || timeElement.text().trim();
        const parsedDate = new Date(datetime);
        if (!isNaN(parsedDate.getTime())) {
          publishedAt = parsedDate;
        }
      }
      
      // Get article content
      let content = "";
      try {
        const articleResponse = await axios.get(link, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        const $article = cheerio.load(articleResponse.data);
        $article("article.content.fck, .detail-content, .detail-cate-main").find('p, h2, h3').each((i, el) => {
          const text = $article(el).text().trim();
          if (text && !text.match(/đọc thêm|xem thêm|video/i)) {
            content += text + "\n\n";
          }
        });
      } catch (error) {
        console.error(`Error fetching article content from ${link}:`, error.message);
      }
      
      articles.push({
        title,
        summary,
        imageUrl,
        sourceUrl: link,
        content: content.substring(0, 500) + (content.length > 500 ? '...' : ''), // Limit content length for display
        publishedAt,
        category,
      });
      
      console.log(`Processed article: ${title.substring(0, 50)}...`);
    }
    
    return articles;
    
  } catch (error) {
    console.error('Error in crawlTuoitreNewsDirect:', error);
    throw error;
  }
}

// Run the test
(async () => {
  try {
    console.log('Starting direct crawler test...');
    const articles = await crawlTuoitreNewsDirect(5);
    
    console.log('\n=== CRAWLER TEST RESULTS ===');
    console.log(`Successfully crawled ${articles.length} articles\n`);
    
    articles.forEach((article, index) => {
      console.log(`\n--- Article ${index + 1} ---`);
      console.log(`Title: ${article.title}`);
      console.log(`URL: ${article.sourceUrl}`);
      console.log(`Category: ${article.category}`);
      console.log(`Published: ${article.publishedAt}`);
      console.log(`Image: ${article.imageUrl || 'N/A'}`);
      console.log(`Summary: ${article.summary.substring(0, 100)}${article.summary.length > 100 ? '...' : ''}`);
      console.log(`Content Preview: ${article.content.substring(0, 150)}...`);
    });
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    process.exit(0);
  }
})();
