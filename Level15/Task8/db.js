
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'budgetDB';

async function connectDB() {
  await client.connect();
  const db = client.db(dbName);
  return db.collection('transactions'); 
}

module.exports = connectDB;
