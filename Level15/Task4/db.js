const { MongoClient } = require('mongodb');
const { mongoUri, dbName } = require('./config');

const client = new MongoClient(mongoUri);

async function connectDB() {
  if (!client.isConnected) await client.connect();
  return client.db(dbName);
}

module.exports = connectDB;
