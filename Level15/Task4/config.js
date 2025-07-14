require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
  apiKey: process.env.API_KEY,
  city: process.env.CITY,
};
