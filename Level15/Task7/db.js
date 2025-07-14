const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'rssAggregator';

async function connectDB() {
  await client.connect();
  const db = client.db(dbName);
  return db.collection('articles');
}

module.exports = connectDB;
