const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('contactBook');
    return db.collection('contacts');
  } catch (err) {
    console.error('DB Connection Error:', err);
  }
}

module.exports = connectDB;
