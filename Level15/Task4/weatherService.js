const axios = require('axios');
const connectDB = require('./db');
const { apiKey, city } = require('./config');

async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=thanjavur&appid=99554d97502336c4311a560c0d4f6c78&units=metric
`;

  const { data } = await axios.get(url);
  return {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    weather: data.weather[0].description,
    date: new Date(),
  };
}

async function saveWeatherEntry(entry) {
  const db = await connectDB();
  await db.collection('weather').insertOne(entry);
}

async function getWeatherSummary(start, end) {
  const db = await connectDB();
  return await db.collection('weather').aggregate([
    {
      $match: {
        date: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
    {
      $group: {
        _id: null,
        avgTemp: { $avg: "$temperature" },
        count: { $sum: 1 },
      },
    },
  ]).toArray();
}

module.exports = { fetchWeather, saveWeatherEntry, getWeatherSummary };
