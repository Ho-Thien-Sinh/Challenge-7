const crawlTuoitreNews = require('./backend/workers/crawler');
const logger = require('./backend/utils/logger');

async function testCrawler() {
  try {
    console.log('Starting crawler test...');
    
    // Test with a small limit first
    const limit = 5;
    console.log(`Crawling ${limit} articles from Tuoi Tre...`);
    
    const startTime = Date.now();
    const articles = await crawlTuoitreNews(limit);
    const endTime = Date.now();
    
    console.log(`\nCrawled ${articles.length} articles in ${(endTime - startTime) / 1000} seconds`);
    console.log('\nSample articles:');
    
    // Display sample of crawled articles
    articles.slice(0, 3).forEach((article, index) => {
      console.log(`\n--- Article ${index + 1} ---`);
      console.log(`Title: ${article.title}`);
      console.log(`Category: ${article.category}`);
      console.log(`Published: ${article.publishedAt}`);
      console.log(`URL: ${article.sourceUrl}`);
      console.log(`Summary: ${article.summary.substring(0, 100)}...`);
      console.log(`Content length: ${article.content ? article.content.length : 0} characters`);
    });
    
    if (articles.length === 0) {
      console.log('\nNo articles were found. Check the selectors in the crawler.');
    }
    
  } catch (error) {
    console.error('Error during crawler test:', error);
  } finally {
    process.exit(0);
  }
}

testCrawler();
