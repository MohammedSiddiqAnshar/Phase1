const Parser = require('rss-parser');
const fs = require('fs/promises');
const connectDB = require('./db');

const parser = new Parser();

async function fetchAndStoreFeeds() {
  const feedUrls = JSON.parse(await fs.readFile('./feeds.json', 'utf-8'));
  const collection = await connectDB();

  for (const url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        const existing = await collection.findOne({ link: item.link });
        if (!existing) {
          await collection.insertOne({
            ...item,
            source: feed.title,
            read: false,
            fetchedAt: new Date()
          });
          console.log(`Stored: ${item.title}`);
        }
      }
    } catch (err) {
      console.error(`Failed to fetch ${url}:`, err.message);
    }
  }
}

// Example queries
async function queryByKeyword(keyword) {
  const collection = await connectDB();
  const results = await collection.find({ title: new RegExp(keyword, 'i') }).toArray();
  results.forEach(article => console.log(article.title, '-', article.source));
}

async function markAsRead(link) {
  const collection = await connectDB();
  await collection.updateOne({ link }, { $set: { read: true } });
  console.log('Marked as read:', link);
}

fetchAndStoreFeeds();
// queryByKeyword('Ukraine');
markAsRead('https://some-article-link.com');
